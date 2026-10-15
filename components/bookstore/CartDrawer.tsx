"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, Trash2, Check, Download } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/lib/types";

type Stage = "bag" | "form" | "processing" | "receipt";

export default function CartDrawer() {
  const { isBagOpen, setBagOpen, detailed, subtotal, count, setQty, remove, clear, items, notify } = useCart();
  const [stage, setStage] = useState<Stage>("bag");
  const [order, setOrder] = useState<Order | null>(null);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", postal: "" });
  const [error, setError] = useState("");

  if (!isBagOpen) return null;

  const close = () => {
    setBagOpen(false);
    setTimeout(() => {
      setStage("bag");
      setError("");
    }, 300);
  };

  const submitCheckout = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      setError("Please complete name, email, and address.");
      return;
    }
    setError("");
    setStage("processing");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shipping: form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      // brief simulated processing for feedback
      await new Promise((r) => setTimeout(r, 900));
      setOrder(data.order as Order);
      setStage("receipt");
      clear();
      notify(`Order ${data.order.id} confirmed`);
    } catch (e) {
      setStage("form");
      setError(e instanceof Error ? e.message : "Checkout failed");
    }
  };

  const downloadReceipt = () => {
    if (!order) return;
    const text = `MARGINALIA — Order ${order.id}\nTracking: ${order.trackingCode}\nDate: ${order.createdAt}\n\n${order.items.map((i) => `${i.quantity}x ${i.title} @ $${i.unitPrice}`).join("\n")}\n\nTotal: $${order.totalAmount}\nShip to: ${order.shippingAddress.name}, ${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postal}\n${order.dispatchDays}`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${order.id}-receipt.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink/40" onClick={close} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-serif text-xl font-semibold">
            {stage === "receipt" ? "Dispatch Ticket" : `Reading Bag (${count})`}
          </h2>
          <button onClick={close} className="rounded-md border border-line p-1.5 hover:border-ink" aria-label="Close bag">
            <X size={16} />
          </button>
        </div>

        {stage === "bag" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {detailed.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-serif text-lg italic text-graphite">Your bag is an empty margin.</p>
                  <p className="mt-1 text-sm text-muted">Add a volume to begin annotating.</p>
                  <button onClick={close} className="mt-4 rounded-md border border-line bg-white px-4 py-2 text-sm font-medium hover:border-ink">
                    Continue browsing
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {detailed.map(({ book, quantity }) => (
                    <li key={book.id} className="flex gap-3 rounded-md border border-line bg-white p-3">
                      <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded border border-line">
                        <Image src={book.coverUrl} alt={book.title} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-serif text-[15px] font-medium">{book.title}</p>
                        <p className="text-[12px] text-graphite">{book.author} · {book.format}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <button onClick={() => setQty(book.id, quantity - 1)} className="rounded border border-line p-1 hover:border-ink" aria-label="Decrease">
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center font-mono text-[13px]">{quantity}</span>
                            <button onClick={() => setQty(book.id, quantity + 1)} className="rounded border border-line p-1 hover:border-ink" aria-label="Increase">
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-mono text-[13px] font-semibold">{formatPrice(book.price * quantity)}</span>
                        </div>
                      </div>
                      <button onClick={() => remove(book.id)} className="self-start p-1 text-muted hover:text-terracotta-deep" aria-label="Remove">
                        <Trash2 size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {detailed.length > 0 && (
              <div className="border-t border-line px-5 py-4">
                <div className="mb-1 flex justify-between text-sm"><span className="text-graphite">Subtotal</span><span className="font-mono font-semibold">{formatPrice(subtotal)}</span></div>
                <div className="mb-3 flex justify-between text-[12px] font-mono text-muted"><span>Postage</span><span>Calculated at dispatch</span></div>
                <button onClick={() => setStage("form")} className="w-full rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-terracotta">
                  Complete Purchase
                </button>
              </div>
            )}
          </>
        )}

        {stage === "form" && (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <p className="mb-3 font-mono text-[12px] uppercase tracking-wide text-muted">Shipping — dummy info accepted</p>
            <div className="space-y-2">
              {(["name", "email", "address", "city", "postal"] as const).map((k) => (
                <label key={k} className="block">
                  <span className="mb-1 block text-[13px] font-medium capitalize">{k}</span>
                  <input
                    value={form[k]}
                    onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                    placeholder={k === "email" ? "reader@example.com" : `Enter ${k}`}
                    className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm focus:border-terracotta focus:outline-none"
                  />
                </label>
              ))}
            </div>
            {error && <p className="mt-2 text-[13px] text-terracotta-deep">{error}</p>}
            <div className="mt-4 flex gap-2">
              <button onClick={() => setStage("bag")} className="flex-1 rounded-md border border-line bg-white px-4 py-2.5 text-sm font-medium hover:border-ink">Back</button>
              <button onClick={submitCheckout} className="flex-[2] rounded-md bg-terracotta px-4 py-2.5 text-sm font-semibold text-white hover:bg-terracotta-deep">
                Pay {formatPrice(subtotal)}
              </button>
            </div>
          </div>
        )}

        {stage === "processing" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-terracotta" />
            <p className="font-mono text-[13px] text-graphite">Validating bag → processing → binding receipt…</p>
          </div>
        )}

        {stage === "receipt" && order && (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="rounded-md border border-line bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-terracotta">
                <Check size={18} />
                <span className="font-serif text-lg font-semibold text-ink">Order confirmed</span>
              </div>
              <dl className="space-y-1 font-mono text-[13px]">
                <div className="flex justify-between"><dt className="text-muted">Order</dt><dd className="font-semibold">{order.id}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Tracking</dt><dd className="font-semibold">{order.trackingCode}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Items</dt><dd>{order.itemCount}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Total</dt><dd className="font-semibold">${order.totalAmount.toFixed(2)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted">Dispatch</dt><dd>{order.dispatchDays}</dd></div>
              </dl>
              <ul className="mt-3 space-y-1 border-t border-line pt-3 text-[13px]">
                {order.items.map((i) => (
                  <li key={i.bookId} className="flex justify-between"><span>{i.quantity}× {i.title}</span><span className="font-mono">${(i.unitPrice * i.quantity).toFixed(2)}</span></li>
                ))}
              </ul>
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={downloadReceipt} className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-line bg-white px-4 py-2.5 text-sm font-medium hover:border-ink">
                <Download size={15} /> Receipt
              </button>
              <button onClick={close} className="flex-1 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-paper hover:bg-terracotta">
                Keep reading
              </button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
