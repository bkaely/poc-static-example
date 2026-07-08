"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import { getToken, clearToken } from "@/lib/auth";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [books, setBooks] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("invalid session");
        setAuthChecked(true);
      })
      .catch(() => {
        clearToken();
        router.replace("/login");
      });
  }, [router]);

  useEffect(() => {
    if (!authChecked) return;

    fetch(`${API_BASE_URL}/api/books`)
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBooks(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [authChecked]);

  function handleLogout() {
    clearToken();
    router.replace("/login");
  }

  if (!authChecked) {
    return (
      <main className={styles.main}>
        <p className={styles.status}>Checking session…</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.title}>Books</h1>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Log out
        </button>
      </div>

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
