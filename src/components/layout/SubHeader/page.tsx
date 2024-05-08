"use client";
import React from "react";
import styles from "./subHeader.module.scss";
import Link from "next/link";
import SubHeaderSocial from "./social";
import { useCart } from "../../context/cartContext/page";

export default function SubHeader() {
  const { errorWishList, loadingWishList, getToWishlistBtn, wishList } =
    useCart();
  return (
    <>
      <section className={styles.subHeader}>
        <div className={styles.leftinfo}>
          <ul>
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Privacy</Link>
            </li>
            <li>
              <Link href="#">FAQ</Link>
            </li>
          </ul>
        </div>
        <div className={styles.rightinfo}>
          <ul className="flex gap-4">
            <li>
              <Link href="#" className="text-sm">
                Track Order
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="text-sm">
                My Wishlist -
                {loadingWishList ? (
                  <div className="spinner-border text-primary">
                    <span className="sr-only">loading Wishlist items</span>
                  </div>
                ) : errorWishList ? (
                  <p>{errorWishList}</p>
                ) : (
                  <>({wishList.length})</>
                )}
              </Link>
            </li>
          </ul>
          <SubHeaderSocial />
        </div>
      </section>
    </>
  );
}
