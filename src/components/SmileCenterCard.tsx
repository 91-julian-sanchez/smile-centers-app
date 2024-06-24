import React from 'react';
import styles from './SmileCenterCard.module.css';

interface SmileCenterCardProps {
  name: string;
  address: string;
  neighborhood: string;
  timetable: {
    weekdays?: string[];
    saturday?: string[];
    sunday?: string[];
  },
  promo:string
}

const SmileCenterCard: React.FC<SmileCenterCardProps> = ({ name, address, neighborhood, timetable, promo }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <img src="/tooth-icon.png" alt="Tooth Icon" />
      </div>
      <div className={styles.cardContent}>
        <h4 className="font-inter-bold color-font-blue-900">{name}</h4>
        {promo && <span className='color-font-red-900'>{promo}</span>}
        <p className="color-font-gray-700">{address}, {neighborhood}</p>
        <p className="color-font-gray-700 scheduler">
            {timetable.weekdays && <span>L-V {timetable.weekdays.join(', ')}</span>}
            {timetable.saturday && <span>/ S {timetable.saturday.join(', ')}</span>}
            {timetable.sunday && <span>/ D {timetable.sunday.join(', ')}</span>}
        </p>
      </div>
    </div>
  );
};

export default SmileCenterCard;
