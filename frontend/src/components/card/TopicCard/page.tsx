import React from 'react';
import { FaArrowRight, FaClock } from 'react-icons/fa';
import './TopicCard.scss';
import Link from 'next/link';

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
      <h4>{data.name}</h4>
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
