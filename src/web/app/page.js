"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

const API_URL =
  "https://special-parakeet-9wr9676j7r2xpxq-3001.app.github.dev/api/books";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Books</h1>

      {status === "loading" && <p className={styles.status}>Loading books…</p>}
      {status === "error" && (
        <p className={styles.error}>
          Couldn&apos;t reach the API. Is it running?
        </p>
      )}

      {status === "ready" && (
        <div className={styles.grid}>
          {books.map((book) => (
            <div key={book.id} className={styles.tile}>
              <span className={styles.bookTitle}>{book.title}</span>
              <span className={styles.bookAuthor}>{book.author}</span>
              <div className={styles.bookMeta}>
                <span className={styles.genre}>{book.genre}</span>
                <span>{book.publishedYear}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
