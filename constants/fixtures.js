/**
 * Contains useful constants
 */
import React from 'react';

export const PLANS = [
  {
    title: 'Self-Employed',
    Price: () => (
      <p className="price-text">
        <span className="old-price-text">$400</span>
        <span className="price-color">$320</span>
      </p>
    ),
    subTitle: 'Manage up to 11 client accounts per year',
    benefits: [
      'Manage & Access Up to 25 Client Accounts from a single dashboard',
      'Track clients&#39; capital gains & losses from all exchanges and gain insights into their individual performance.',
      'Download auto-filled tax forms for all clients.',
    ],
  },
  {
    title: 'Small Firms',
    Price: () => (
      <p className="price-text">
        <span className="old-price-text">$1000</span>
        <span className="price-color">$800</span>
      </p>
    ),
    subTitle: 'Manage up to 26 client accounts per year',
    benefits: [
      'Manage & Access Up to 25 Client Accounts from a single dashboard',
      'Track clients&#39; capital gains & losses from all exchanges and gain insights into their individual performance.',
      'Download auto-filled tax forms for all clients.',
    ],
  },
  {
    title: 'Mid-size Firms',
    Price: () => (
      <p className="price-text">
        <span className="old-price-text">$2000</span>
        <span className="price-color">$1600</span>
      </p>
    ),
    subTitle: 'Manage up to 51 client accounts per year',
    benefits: [
      'Manage & Access Up to 25 Client Accounts from a single dashboard',
      'Track clients&#39; capital gains & losses from all exchanges and gain insights into their individual performance.',
      'Download auto-filled tax forms for all clients.',
    ],
  },
  {
    title: 'Large Firms',
    Price: () => (
      <p className="price-text">
        <span className="old-price-text">$4000</span>
        <span className="price-color">$3200</span>
      </p>
    ),
    subTitle: 'Manage up to 101 client accounts per year',
    benefits: [
      'Manage & Access Up to 25 Client Accounts from a single dashboard',
      'Track clients&#39; capital gains & losses from all exchanges and gain insights into their individual performance.',
      'Download auto-filled tax forms for all clients.',
    ],
  },
];
