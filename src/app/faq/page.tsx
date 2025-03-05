"use client";
import { TracingBeam } from "../components/TracingBeam";
import React, { useState } from "react";
import { defaultFaqs } from "../utils/faqs";
interface Faq {
  question: string;
  answer: string;
}
export default function FAQs() {
  const [Faqs, setFaqs] = useState<Faq[]>(defaultFaqs);

  const findQuery = (e: any) => {
    const query: string[] = e.target.value.split(" ");
    console.log(query);
    if (query.length > 0) {
      const filteredFaqs = defaultFaqs.filter((faq: Faq) => {
        let isMatched: boolean = false;
        query.forEach((word: string) => {
          if (faq.question.toLowerCase().includes(word.toLowerCase())) {
            isMatched = true;
          }
        });
        return isMatched;
      });
      console.log(filteredFaqs);
      setFaqs(() => {
        return filteredFaqs;
      });
    } else {
      setFaqs(defaultFaqs);
    }
  };
  return (
    <TracingBeam>
      <section className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100/5 via-gray-300/60 to-gray-300/60">
        <div className="relative container px-6 py-12 max-w-5xl mx-auto ">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[520px] text-center lg:mb-20">
                <span className="block mb-2 text-6xl md:text-9xl uppercase  font-semibold  text-secondary-500">
                  FAQ&apos;<span className="lowercase">s</span>
                </span>
                <h2 className=" text-slate-600 mb-4 text-xl md:text-3xl font-bold ">
                  Any Questions? Look Here
                </h2>
              </div>
            </div>
          </div>
          <div
            className="fixed -z-10 w-60 h-60 blur-3xl bg-blue-400 opacity-20 
          top-40 left-1/2 transform -translate-y-1/2 rounded-full "
          ></div>

          <h1 className="text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white">
            Frequently asked questions
          </h1>

          {Faqs.map((faq, index) => {
            return (
              <div key={index} className="mt-5 shadow-xl space-y-8 lg:mt-5">
                <div className="relative p-2 bg-gray-100 rounded-lg dark:bg-blue-200/10">
                  <input
                    type="checkbox"
                    name="faq"
                    id={`opt_${index}`}
                    className={`peer hidden`}
                  />
                  <label
                    htmlFor={`opt_${index}`}
                    className="flex  items-center justify-between gap-5 w-full cursor-pointer hover:bg-gray-200 dark:hover:bg-secondary-600 p-5 rounded-lg transition-all duration-300 ease-in-out peer-checked:bg-secondary-600/80 peer-checked:text-white"
                  >
                    <h1 className="font-semibold  dark:text-white">
                      {faq.question}
                    </h1>
                  </label>
                  <span className="absolute top-5 hidden right-5 md:right-10 text-gray-400 bg-gray-200 rounded-full peer-checked:block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 12H6"
                      />
                    </svg>
                  </span>
                  <span className="absolute top-5 block right-5 md:right-10 text-gray-400 bg-gray-200 rounded-full peer-checked:hidden">
                    <svg
                      className="w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 320 512"
                    >
                      <path
                        d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
                        fill="purple"
                      />
                    </svg>
                  </span>

                  <p
                    className={`h-0 top-0  peer-checked:h-20 overflow-hidden px-8  peer-checked:mt-6 text-sm text-grapeer-checked:y-500 dark:text-gray-300 transition-all duration-300 ease-in-out`}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </TracingBeam>
  );
}
