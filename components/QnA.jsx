import React, { useState } from 'react';
import Image from "next/image";
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";

const QnA = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  const questionsAndAnswers = [
    {
      question: "Advantages",
      answer: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt."
      ]
    },
    {
      question: "Procedure",
      answer: [
        "You can track your order by using the tracking number provided in your shipping confirmation email."
      ]
    },
    {
      question: "After Care",
      answer: [
        "Yes, we offer gift cards in various denominations. You can purchase them online or in-store."
      ]
    },
    {
      question: "Pain Tolerance",
      answer: [
        "Yes, we offer gift cards in various denominations. You can purchase them online or in-store."
      ]
    },
  ];

  return (
    <div className="py-20 px-24 bg-bgtop">
      {questionsAndAnswers.map((item, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full flex justify-between items-center p-4 rounded-lg border-none my-5"
            onClick={() => toggleQuestion(index)}
          >
            <span className='font-playfair text-6xl font-semibold text-primary uppercase'>{item.question}</span>
            <span
              className={`transition-transform duration-500 ${openIndex === index ? 'rotate-180' : ''}`}
            >
              {openIndex === index ? (
                <Image src={minus} alt='open' className='w-[56px]' />
              ) : (
                <Image src={plus} alt='collapse' className='w-[56px] h-[56px]' />
              )}
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="my-10 p-4 rounded-lg">
              <ul className="list-disc pl-5">
                {item.answer.map((text, idx) => (
                  <li className='text-2xl font-nunito text-subtext leading-10 text-start mb-5 max-w-[1239px]' key={idx}>
                    <span className="inline">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-toptext mt-4"></div>
        </div>
      ))}
    </div>
  );
};

export default QnA;
