"use client";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Home() {
  const firebaseConfig = {
    apiKey: "AIzaSyBsj8iqtFA93fItNMscYlbmrFaiMaC8CiE",
    authDomain: "kenta-71006.firebaseapp.com",
    projectId: "kenta-71006",
    storageBucket: "kenta-71006.appspot.com",
    messagingSenderId: "333405733899",
    appId: "1:333405733899:web:2fb5b5f40a924e1d4c330e",
    measurementId: "G-BQL9W662XR",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage(app);

  const [images, setImages] = useState([]);
  const [downloadURLs, setDownloadURLs] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setImages([...e.target.files]);
    }
  };

  const handleUpload = async () => {
    const urls = [];

    // Duyệt qua mảng ảnh và tải lên mỗi ảnh
    for (const image of images) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);

      // Lấy đường dẫn đến ảnh đã tải lên
      const url = await getDownloadURL(storageRef);
      urls.push(url);
    }

    // Cập nhật state với mảng đường dẫn đã tải lên
    setDownloadURLs(urls);

    console.log("Download URLs:", urls);
  };

  return (
    <main>
      <div style={{ margin: "auto", height: "500px" }}>
        <h1>Hello Next.js!</h1>
        <div>
          <input type="file" onChange={handleFileChange} multiple />
          <button onClick={handleUpload}>Upload Images</button>

          {downloadURLs.length > 0 && (
            <div>
              <p>Download URLs:</p>
              <ul>
                {downloadURLs.map((url, index) => (
                  <li key={index}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
