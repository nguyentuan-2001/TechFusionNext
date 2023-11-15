"use client"
import { useEffect, useState } from 'react';
import styles from '../../styles/Home.module.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const triggerPoint = 300; // Điều chỉnh giá trị này tùy thuộc vào vị trí bạn muốn kích hoạt hiệu ứng
    setIsVisible(scrollY > triggerPoint);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1>Scroll down to see the effect</h1>
      <div className={`${styles.imageContainer} ${isVisible ? styles.showImage : ''}`}>
        {/* Thẻ div chứa ảnh */}
        <img src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645-t.jpg" alt="Your Image" />
      </div>
      {/* Thêm nội dung khác */}
    </div>
  );
};

export default Home;
