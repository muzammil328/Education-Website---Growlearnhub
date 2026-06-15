import React from 'react';
import './FeedbackCard.scss';
import Image from 'next/image';
import { Heading5, Para } from '@muzammil328/ui';

export default function FeedbackCard({
  data,
}: {
  data: {
    name: string;
    description: string;
    image: string;
    career: string;
  };
}) {
  return (
    <div className="feedback-card">
      <div className="header">
        <div className="thumb">
          <Image src={data.image} alt="" title="" height={400} width={400} />
        </div>
        <div className="info">
          <Heading5>{data.name}</Heading5>
          <span>{data.career}</span>
        </div>
      </div>
      <div className="footer">
        <Para>{data.description}</Para>
      </div>
    </div>
  );
}
