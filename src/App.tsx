/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Copy,
  Check,
  Tag,
  ShieldCheck,
  Sparkles,
  Info,
  ArrowRight,
  Calculator,
  Percent,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  CreditCard,
  X
} from 'lucide-react';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function App() {
  const COUPON_CODE = 'CRACKCOURSE';
  const DISCOUNT_PERCENTAGE = 70; // 70% discount

  const [copied, setCopied] = useState(false);
  const [testInputCode, setTestInputCode] = useState('CRACKCOURSE');
  const [samplePrice, setSamplePrice] = useState<number>(100);
  const [customPriceInput, setCustomPriceInput] = useState<string>('100');
  const [validationStatus, setValidationStatus] = useState<'valid' | 'invalid' | 'idle'>('valid');
  const [purchaseEventFired, setPurchaseEventFired] = useState<boolean>(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
  const [lastTrackedValue, setLastTrackedValue] = useState<number>(30);

  // Fire Purchase event automatically when page loads
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Purchase', {
        value: 30.00,
        currency: 'USD',
        content_name: 'CRACKCOURSE Course Access',
        content_type: 'product',
        coupon: 'CRACKCOURSE'
      });
      setPurchaseEventFired(true);
    }
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleValidateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = testInputCode.trim().toUpperCase();
    if (clean === COUPON_CODE) {
      setValidationStatus('valid');
    } else {
      setValidationStatus('invalid');
    }
  };

  const calculatedDiscount = validationStatus === 'valid' 
    ? (samplePrice * DISCOUNT_PERCENTAGE) / 100 
    : 0;
  const finalPrice = Math.max(0, samplePrice - calculatedDiscount);

  const handleTriggerPurchase = (amount: number) => {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Purchase', {
        value: amount,
        currency: 'USD',
        content_name: 'CRACKCOURSE Course Access',
        content_type: 'product',
        coupon: COUPON_CODE
      });
    }
    setLastTrackedValue(amount);
    setPurchaseEventFired(true);
    setShowPurchaseModal(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] font-sans antialiased selection:bg-[#7C1B20] selection:text-white flex flex-col">
      {/* TOP NOTIFICATION BAR */}
      <div className="bg-[#1C1917] text-[#E7E2D6] px-6 py-2.5 text-xs text-center border-b border-[#2E2A27]">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 font-medium">
          <Tag size={13} className="text-[#FBBF24]" />
          <span>Active Promotional Coupon:</span>
          <span className="font-mono font-bold tracking-wider text-white bg-[#2E2A27] px-2 py-0.5 rounded">
            {COUPON_CODE}
          </span>
          <span className="text-[#A8A29E] hidden sm:inline">· Instant 70% Discount on Eligible Courses</span>
        </div>
      </div>

      {/* PURCHASE EVENT TRACKING STATUS BANNER */}
      <div className="bg-emerald-50 border-b border-emerald-200/80 px-6 py-2 text-xs text-center text-emerald-900">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-2 font-medium">
          <CheckCircle2 size={13} className="text-emerald-700 shrink-0" />
          <span className="font-semibold text-emerald-800">Meta Pixel Purchase Tracking Active:</span>
          <span className="font-mono bg-emerald-100/70 border border-emerald-300 px-2 py-0.5 rounded text-[11px] text-emerald-900">
            fbq('track', 'Purchase', &#123; value: 30.00, currency: 'USD' &#125;)
          </span>
          <span className="text-emerald-700/80 text-[11px]">· Pixel ID: 1526599065999406</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E7E2D6] px-6 lg:px-16 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#7C1B20] text-white flex items-center justify-center font-mono font-bold text-sm shadow-sm">
              %
            </div>
            <div>
              <span className="text-xl font-serif font-bold tracking-tight text-[#1C1917] block leading-none">
                {COUPON_CODE}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#78716C] font-semibold block mt-1">
                Official Coupon Portal
              </span>
            </div>
          </div>

          <button
            onClick={handleCopyCode}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2 ${
              copied
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-[#7C1B20] hover:bg-[#631418] text-white shadow-sm'
            }`}
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied Code</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Coupon</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-5xl mx-auto px-6 lg:px-8 py-12 lg:py-16 space-y-16 w-full">
        {/* HERO VOUCHER PRESENTATION */}
        <section className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7C1B20]/10 text-[#7C1B20] text-xs font-semibold tracking-wider uppercase">
            <Sparkles size={13} />
            <span>Verified Course Discount Code</span>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.12]">
              Coupon Information: <span className="text-[#7C1B20] font-mono tracking-tight">{COUPON_CODE}</span>
            </h1>
            <p className="text-base sm:text-lg text-[#57534E] leading-relaxed">
              Use the official coupon code <strong className="text-[#1C1917] font-mono font-semibold">{COUPON_CODE}</strong> at checkout to claim an exclusive <strong className="text-[#7C1B20]">{DISCOUNT_PERCENTAGE}% discount</strong> on all eligible course enrolments, learning tracks, and study modules.
            </p>
          </div>

          {/* VOUCHER TICKET CARD */}
          <div className="max-w-xl mx-auto bg-white rounded-2xl border-2 border-dashed border-[#7C1B20]/40 p-8 shadow-sm relative overflow-hidden space-y-6">
            <div className="flex items-center justify-between border-b border-[#E7E2D6] pb-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#78716C] flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" />
                Verified & Valid
              </span>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% Working
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-[#78716C] uppercase tracking-wider block">Click Below to Copy Code</span>
              <div
                onClick={handleCopyCode}
                className="cursor-pointer group bg-[#FBF9F5] border-2 border-[#E7E2D6] hover:border-[#7C1B20] rounded-xl p-5 transition-all flex items-center justify-between gap-4"
              >
                <div className="text-left">
                  <span className="font-mono text-3xl sm:text-4xl font-extrabold tracking-wider text-[#7C1B20] group-hover:scale-105 transition-transform block">
                    {COUPON_CODE}
                  </span>
                  <span className="text-xs text-[#78716C] font-sans">
                    Tap anywhere on this box to copy
                  </span>
                </div>
                <div
                  className={`p-3 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all ${
                    copied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#7C1B20] text-white group-hover:bg-[#631418]'
                  }`}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Code'}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
              <div className="p-3 bg-[#FBF9F5] rounded-xl border border-[#E7E2D6]">
                <span className="text-[#78716C] block text-[11px] uppercase tracking-wider">Discount</span>
                <span className="font-serif font-bold text-lg text-[#1C1917] mt-0.5 block">{DISCOUNT_PERCENTAGE}% OFF</span>
              </div>
              <div className="p-3 bg-[#FBF9F5] rounded-xl border border-[#E7E2D6]">
                <span className="text-[#78716C] block text-[11px] uppercase tracking-wider">Applicable</span>
                <span className="font-serif font-bold text-lg text-[#1C1917] mt-0.5 block">All Courses</span>
              </div>
              <div className="p-3 bg-[#FBF9F5] rounded-xl border border-[#E7E2D6]">
                <span className="text-[#78716C] block text-[11px] uppercase tracking-wider">Status</span>
                <span className="font-serif font-bold text-lg text-emerald-700 mt-0.5 block">Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILED COUPON SPECIFICATIONS */}
        <section className="bg-white rounded-2xl border border-[#E7E2D6] p-8 lg:p-10 shadow-sm space-y-6">
          <div className="border-b border-[#E7E2D6] pb-4">
            <h2 className="text-2xl font-serif font-bold text-[#1C1917]">Coupon Specifications & Details</h2>
            <p className="text-sm text-[#57534E] mt-1">Complete technical details and terms regarding code {COUPON_CODE}.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                <span className="text-[#78716C]">Coupon Code</span>
                <span className="font-mono font-bold text-[#7C1B20]">{COUPON_CODE}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                <span className="text-[#78716C]">Benefit Rate</span>
                <span className="font-semibold text-[#1C1917]">{DISCOUNT_PERCENTAGE}% Direct Course Price Reduction</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                <span className="text-[#78716C]">Eligible Items</span>
                <span className="font-semibold text-[#1C1917]">All Digital Courses & Learning Tracks</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                <span className="text-[#78716C]">Usage Limit</span>
                <span className="font-semibold text-[#1C1917]">1 redemption per student account</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                <span className="text-[#78716C]">Minimum Cart Value</span>
                <span className="font-semibold text-[#1C1917]">No minimum purchase required</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[#F2ECE1]">
                <span className="text-[#78716C]">Case Sensitivity</span>
                <span className="font-semibold text-[#1C1917]">Insensitive (e.g. crackcourse or CRACKCOURSE)</span>
              </div>
            </div>
          </div>
        </section>

        {/* STEP BY STEP: HOW TO APPLY */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#7C1B20]">Quick Instructions</span>
            <h2 className="text-3xl font-serif font-bold text-[#1C1917]">How to Redeem "{COUPON_CODE}"</h2>
            <p className="text-sm text-[#57534E]">Follow these 3 simple steps during course checkout.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E7E2D6] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#7C1B20]/10 text-[#7C1B20] flex items-center justify-center font-serif font-bold text-base">
                1
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1C1917]">Copy the Code</h3>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Click the copy button on this page to copy <strong className="font-mono text-[#1C1917]">{COUPON_CODE}</strong> to your device clipboard.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E7E2D6] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#7C1B20]/10 text-[#7C1B20] flex items-center justify-center font-serif font-bold text-base">
                2
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1C1917]">Select Course</h3>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Navigate to your chosen course enrolment page and proceed to the checkout / payment screen.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E7E2D6] shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#7C1B20]/10 text-[#7C1B20] flex items-center justify-center font-serif font-bold text-base">
                3
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1C1917]">Apply & Save</h3>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Paste <strong className="font-mono text-[#1C1917]">{COUPON_CODE}</strong> into the coupon/promo field and confirm to deduct {DISCOUNT_PERCENTAGE}% instantly.
              </p>
            </div>
          </div>
        </section>

        {/* INTERACTIVE COUPON DISCOUNT CALCULATOR */}
        <section className="bg-white rounded-2xl border border-[#E7E2D6] p-8 lg:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E2D6] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7C1B20]">
                <Calculator size={15} />
                <span>Interactive Tool</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[#1C1917] mt-1">
                Coupon Savings Calculator
              </h2>
            </div>
            <p className="text-xs text-[#78716C] max-w-xs">
              Simulate price savings when applying <strong className="font-mono text-[#1C1917]">{COUPON_CODE}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* INPUTS */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                  Select Sample Course Price ($)
                </label>
                <div className="flex flex-wrap gap-2">
                  {[49, 99, 149, 199, 299].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSamplePrice(amt);
                        setCustomPriceInput(amt.toString());
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                        samplePrice === amt
                          ? 'bg-[#1C1917] text-white shadow-sm'
                          : 'bg-[#FBF9F5] border border-[#D6CEBE] text-[#57534E] hover:border-[#1C1917]'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                  Or Enter Custom Course Price ($)
                </label>
                <input
                  type="number"
                  min="1"
                  value={customPriceInput}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCustomPriceInput(val);
                    const parsed = parseFloat(val);
                    if (!isNaN(parsed) && parsed >= 0) {
                      setSamplePrice(parsed);
                    }
                  }}
                  className="w-full px-4 py-3 bg-[#FBF9F5] border border-[#D6CEBE] rounded-lg text-sm font-mono text-[#1C1917] focus:outline-none focus:border-[#7C1B20]"
                />
              </div>

              {/* COUPON VALIDATION INPUT */}
              <form onSubmit={handleValidateCoupon} className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1C1917]">
                  Apply Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={testInputCode}
                    onChange={(e) => {
                      setTestInputCode(e.target.value);
                      if (validationStatus !== 'idle') setValidationStatus('idle');
                    }}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-3 bg-[#FBF9F5] border border-[#D6CEBE] rounded-lg text-sm font-mono font-bold uppercase text-[#1C1917] focus:outline-none focus:border-[#7C1B20]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#7C1B20] hover:bg-[#631418] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {validationStatus === 'valid' && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium pt-1">
                    <CheckCircle2 size={14} />
                    <span>Coupon "{COUPON_CODE}" successfully applied! {DISCOUNT_PERCENTAGE}% discount unlocked.</span>
                  </div>
                )}

                {validationStatus === 'invalid' && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-600 font-medium pt-1">
                    <AlertCircle size={14} />
                    <span>Invalid code. Please use official coupon code: {COUPON_CODE}</span>
                  </div>
                )}
              </form>
            </div>

            {/* BREAKDOWN DISPLAY */}
            <div className="lg:col-span-5 bg-[#FBF9F5] border border-[#E7E2D6] rounded-2xl p-6 space-y-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#78716C] block">
                Calculated Price Summary
              </span>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#57534E]">
                  <span>Original Course Price</span>
                  <span className="font-mono font-semibold">${samplePrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#7C1B20]">
                  <span>Discount ({validationStatus === 'valid' ? `${DISCOUNT_PERCENTAGE}% OFF` : '0%'})</span>
                  <span className="font-mono font-semibold">-${calculatedDiscount.toFixed(2)}</span>
                </div>

                <div className="border-t border-[#E7E2D6] pt-3 flex justify-between items-baseline">
                  <span className="font-serif font-bold text-base text-[#1C1917]">Final Price</span>
                  <span className="font-serif font-bold text-3xl text-[#1C1917]">
                    ${finalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {validationStatus === 'valid' && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-medium">
                  You save <strong>${calculatedDiscount.toFixed(2)}</strong> with coupon {COUPON_CODE}!
                </div>
              )}

              <button
                type="button"
                onClick={() => handleTriggerPurchase(finalPrice)}
                className="w-full py-3.5 bg-[#7C1B20] hover:bg-[#631418] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <CreditCard size={15} />
                <span>Complete Purchase with CRACKCOURSE (${finalPrice.toFixed(2)})</span>
              </button>
              <div className="text-[11px] text-center text-[#78716C] flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span>Triggers Meta Pixel Purchase Conversion ({COUPON_CODE})</span>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="bg-white rounded-2xl border border-[#E7E2D6] p-8 lg:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#7C1B20]">
            <HelpCircle size={15} />
            <span>Questions & Clarifications</span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1C1917]">
            Frequently Asked Questions regarding {COUPON_CODE}
          </h2>

          <div className="space-y-6 text-sm divide-y divide-[#F2ECE1]">
            <div className="pt-4 first:pt-0 space-y-1.5">
              <h3 className="font-serif font-bold text-base text-[#1C1917]">
                What is the exact coupon code to use?
              </h3>
              <p className="text-[#57534E] leading-relaxed">
                The exact coupon code is <strong className="font-mono font-bold text-[#7C1B20]">{COUPON_CODE}</strong>. You can copy it directly using the copy button on this page.
              </p>
            </div>

            <div className="pt-4 space-y-1.5">
              <h3 className="font-serif font-bold text-base text-[#1C1917]">
                Does {COUPON_CODE} apply to all courses?
              </h3>
              <p className="text-[#57534E] leading-relaxed">
                Yes, this coupon is designated for all standard online courses, certificate modules, and training programs.
              </p>
            </div>

            <div className="pt-4 space-y-1.5">
              <h3 className="font-serif font-bold text-base text-[#1C1917]">
                Is the code case-sensitive?
              </h3>
              <p className="text-[#57534E] leading-relaxed">
                No, you can type it in lowercase (<code className="font-mono text-xs">crackcourse</code>) or uppercase (<code className="font-mono text-xs">CRACKCOURSE</code>).
              </p>
            </div>

            <div className="pt-4 space-y-1.5">
              <h3 className="font-serif font-bold text-base text-[#1C1917]">
                What if {COUPON_CODE} shows as invalid at checkout?
              </h3>
              <p className="text-[#57534E] leading-relaxed">
                Ensure there are no leading or trailing whitespace characters. You can also re-copy the code directly from this portal to verify exact spelling.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* MINIMAL FOOTER EXCLUSIVELY FOR COUPON INFORMATION */}
      <footer className="bg-[#1C1917] text-[#A8A29E] py-12 px-6 lg:px-16 border-t border-[#2E2A27] mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <span className="font-mono font-bold text-white text-sm tracking-wider">{COUPON_CODE}</span>
              <span className="text-[#78716C]">·</span>
              <span className="text-[#E7E2D6]">Course Coupon Information Portal</span>
            </div>
            <p className="text-[#78716C]">
              All promotional information and coupon terms apply strictly to code "{COUPON_CODE}".
            </p>
          </div>

          <button
            onClick={handleCopyCode}
            className="px-4 py-2 bg-[#2E2A27] hover:bg-[#3D3834] text-white rounded-lg font-mono text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : `Copy ${COUPON_CODE}`}</span>
          </button>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-6 border-t border-[#2E2A27] text-center text-[11px] text-[#78716C]">
          © 2026 {COUPON_CODE} Coupon Information. All rights reserved.
        </div>
      </footer>

      {/* PURCHASE TRACKING CONFIRMATION MODAL */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative space-y-6 shadow-2xl border border-[#D6CEBE]">
            <button
              onClick={() => setShowPurchaseModal(false)}
              className="absolute top-6 right-6 text-[#A8A29E] hover:text-[#1C1917] transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="space-y-2 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 size={32} />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Meta Pixel Conversion Tracked
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#1C1917]">
                Purchase Event Fired!
              </h3>
              <p className="text-xs text-[#57534E]">
                The standard Meta Pixel <code className="font-mono font-bold text-[#7C1B20]">Purchase</code> event was successfully sent to Pixel ID <strong className="font-mono">1526599065999406</strong>.
              </p>
            </div>

            <div className="bg-[#FBF9F5] border border-[#E7E2D6] rounded-xl p-4 text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-[#78716C]">Event Name:</span>
                <span className="font-bold text-[#1C1917]">Purchase</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Tracked Value:</span>
                <span className="font-bold text-emerald-700">${lastTrackedValue.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Coupon:</span>
                <span className="font-bold text-[#7C1B20]">{COUPON_CODE}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Discount:</span>
                <span className="font-bold text-[#1C1917]">{DISCOUNT_PERCENTAGE}% OFF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#78716C]">Pixel ID:</span>
                <span className="font-bold text-[#1C1917]">1526599065999406</span>
              </div>
            </div>

            <button
              onClick={() => setShowPurchaseModal(false)}
              className="w-full py-3 bg-[#1C1917] hover:bg-[#2E2A27] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
            >
              Close Confirmation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
