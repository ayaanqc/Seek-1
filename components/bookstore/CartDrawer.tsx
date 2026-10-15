"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Minus, Plus, Trash2, Check, Download } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/utils";
import { useBodyScrollLock, useEscapeToClose } from "@/lib/hooks";
import { Button, Input } from "@/components/ui/controls";
import type { Order } from "@/lib/types";

type Stage = "bag" | "form" | "processing" | "receipt";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMPTY_FORM = { name: "", email: "", address: "", city: "", postal: "" };

export default function CartDrawer() {
  const { isBagOpen, setBagOpen, detailed, subtotal, count, setQty, remove, clear, items, notify } = useCart();
  const [stage, setStage] = useState<Stage>("bag");
  const [order, setOrder] = useState<Order | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useBodyScrollLock(isBagOpen);
  useEscapeToClose(isBagOpen, () => close());
  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    []
  );

  function close() {
    setBagOpen(false);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      setStage("bag");
      setError("");
      setForm(EMPTY_FORM);
    }, 300);
  }

  const submitCheckout = async () => {
    const name = form.name.trim();
    const email = form.email.trim();
    const address = form.address.trim();

    if (!name || !email || !address) {
      setError("Please complete name, email, and address.");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setError("Please enter a valid email address.");
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
      const data = (await res.json().catch(() => ({}))) as { order?: Order; error?: string };
      if (!res.ok || !data.order) throw new Error(data.error ?? "Checkout failed");
      // Brief simulated processing so the state change is perceptible.
      await new Promise((r) => setTimeout(r, 700));
      setOrder(data.order);
      setStage("receipt");
      clear();
      notify(`Order ${data.order.id} confirmed`);
    } catch (e) {
      setStage("form");
      setError(e instanceof Error ? e.message : "Checkout failed. Please try again.");
    }
  };

  const downloadReceipt = () => {
    if (!order) return;
    const lines = [
      "MARGINALIA — Order Confirmation",
      `Order:    ${order.id}`,
      `Tracking: ${order.trackingCode}`,
      `Placed:   ${order.createdAt}`,
      "",
      ...order.items.map((i) => `${i.quantity} x ${i.title} @ ${formatPrice(i.unitPrice)}`),
      "",
      `Total:    ${formatPrice(order.totalAmount)}`,
      `Ship to:  ${order.shippingAddress.name}, ${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postal}`,
      order.dispatchDays,
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${order.id}-receipt.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Revoking synchronously can cancel the download in some browsers —
    // give the navigation a tick to pick the blob up first.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  if (!isBagOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 animate-fade-in bg-ink/40" onClick={close} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={stage === "receipt" ? "Order confirmation" : "Shopping bag"}
        className="absolute right-0 top-0 flex h-full w-full max-w-md animate-slide-in-right flex-col bg-paper shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-serif text-xl font-semibold">
            {stage === "receipt" ? "Dispatch Ticket" : `Reading Bag (${count})`}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Close bag"
            className="rounded-md border border-line p-1.5 transition duration-150 ease-out hover:border-terracotta hover:bg-wash hover:text-terracotta active:scale-90"
          >
            <X size={16} aria-hidden />
          </button>
        </div>

        {stage === "bag" && (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {detailed.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-serif text-lg italic text-graphite">Your bag is an empty margin.</p>
                  <p className="mt-1 text-sm text-muted">Add a volume to begin annotating.</p>
                  <Button variant="outline" className="mt-4" onClick={close}>
                    Continue browsing
                  </Button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {detailed.map(({ book, quantity }) => (
                    <li key={book.id} className="flex gap-3 rounded-md border border-line bg-white p-3">
                      <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded border border-line">
                        <Image
                          src={book.coverUrl}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="56px"
                          quality={80}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-serif text-[15px] font-medium">{book.title}</p>
                        <p className="text-[12px] text-graphite">
                          {book.author} &middot; {book.format}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => setQty(book.id, quantity - 1)}
                              className="rounded border border-line p-1 transition duration-150 ease-out hover:border-terracotta hover:bg-wash hover:text-terracotta active:scale-90"
                              aria-label={`Decrease quantity of ${book.title}`}
                            >
                              <Minus size={12} aria-hidden />
                            </button>
                            <span className="w-6 text-center font-mono text-[13px]" aria-live="polite">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(book.id, quantity + 1)}
                              disabled={quantity >= 9}
                              className="rounded border border-line p-1 transition duration-150 ease-out hover:border-terracotta hover:bg-wash hover:text-terracotta active:scale-90 disabled:cursor-not-allowed disabled:opacity-40"
                              aria-label={`Increase quantity of ${book.title}`}
                            >
                              <Plus size={12} aria-hidden />
                            </button>
                          </div>
                          <span className="font-mono text-[13px] font-semibold">
                            {formatPrice(book.price * quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(book.id)}
                        className="self-start rounded p-1 text-muted transition duration-150 ease-out hover:bg-terracotta/10 hover:text-terracotta-deep active:scale-90"
                        aria-label={`Remove ${book.title} from bag`}
                      >
                        <Trash2 size={14} aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {detailed.length > 0 && (
              <div className="border-t border-line px-5 py-4">
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-graphite">Subtotal</span>
                  <span className="font-mono font-semibold" data-testid="subtotal">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="mb-3 flex justify-between font-mono text-[12px] text-muted">
                  <span>Postage</span>
                  <span>Calculated at dispatch</span>
                </div>
                <Button className="w-full" onClick={() => setStage("form")}>
                  Complete Purchase
                </Button>
              </div>
            )}
          </>
        )}

        {stage === "form" && (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <p className="mb-3 font-mono text-[12px] uppercase tracking-wide text-muted">
              Shipping &mdash; dummy info accepted
            </p>
            <div className="space-y-2">
              {(["name", "email", "address", "city", "postal"] as const).map((key) => (
                <label key={key} className="block">
                  <span className="mb-1 block text-[13px] font-medium capitalize">{key}</span>
                  <Input
                    value={form[key]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={
                      key === "email"
                        ? "reader@example.com"
                        : key === "name"
                          ? "Ada Reader"
                          : `Enter ${key}`
                    }
                    aria-label={key}
                    autoComplete={
                      key === "name" ? "name" : key === "email" ? "email" : key === "postal" ? "postal-code" : "on"
                    }
                  />
                </label>
              ))}
            </div>
            {error && (
              <p role="alert" className="mt-2 text-[13px] text-terracotta-deep">
                {error}
              </p>
            )}
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStage("bag")}>
                Back
              </Button>
              <Button variant="accent" className="flex-[2]" onClick={submitCheckout}>
                Pay {formatPrice(subtotal)}
              </Button>
            </div>
          </div>
        )}

        {stage === "processing" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-5">
            <div
              aria-hidden
              className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-terracotta"
            />
            <p role="status" className="font-mono text-[13px] text-graphite">
              Validating bag &rarr; processing &rarr; binding receipt&hellip;
            </p>
          </div>
        )}

        {stage === "receipt" && order && (
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="rounded-md border border-line bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-terracotta">
                <Check size={18} aria-hidden />
                <span className="font-serif text-lg font-semibold text-ink">Order confirmed</span>
              </div>
              <dl className="space-y-1 font-mono text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-muted">Order</dt>
                  <dd className="font-semibold">{order.id}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Tracking</dt>
                  <dd className="font-semibold">{order.trackingCode}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Items</dt>
                  <dd>{order.itemCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Total</dt>
                  <dd className="font-semibold">{formatPrice(order.totalAmount)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Dispatch</dt>
                  <dd>{order.dispatchDays}</dd>
                </div>
              </dl>
              <ul className="mt-3 space-y-1 border-t border-line pt-3 text-[13px]">
                {order.items.map((i) => (
                  <li key={i.bookId} className="flex justify-between gap-4">
                    <span className="truncate">
                      {i.quantity}&times; {i.title}
                    </span>
                    <span className="font-mono">{formatPrice(i.unitPrice * i.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={downloadReceipt}>
                <Download size={15} aria-hidden /> Receipt
              </Button>
              <Button className="flex-1" onClick={close}>
                Keep reading
              </Button>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
