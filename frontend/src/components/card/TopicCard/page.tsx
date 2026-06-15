import React from 'react';
import { FaArrowRight, FaClock } from 'react-icons/fa';
import './TopicCard.scss';
import Link from 'next/link';
import { Heading4 } from '@muzammil328/ui';

export default function TopicCard({
  data,
}: {
  data: {
    name: string;
    date: string;
  };
}) {
  return (
    <div className="topic-card">
      <div className="heading">
        <span>
          <FaClock />
        </span>
        <span>{data.date}</span>
      </div>
      <Heading4>{data.name}</Heading4>
      <div className="footer">
        <Link href="/" title="Learn More" className="inner">
          <span>Learn More</span>
          <span className="icon">
            <FaArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
}
