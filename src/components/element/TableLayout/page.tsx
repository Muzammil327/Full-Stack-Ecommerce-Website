"use client";
import React from "react";
import Link from "next/link";
import styles from "@/src/components/element/TableLayout/form.module.css";

export default function TableLayout({
  title,
  titleLink,
  c1,
  c2,
  c3,
  c4,
  ca,
  data,
  DeleteHandle,
  updateLink,
}: any) {
  return (
    <>
      <div className={`${styles.form}`}>
        {titleLink && (
          <Link href={titleLink} className={`${styles.formaboveBTN}`}>
            {title}
          </Link>
        )}

        <table className={`${styles.table}`}>
          <thead className={`${styles.thead}`}>
            <tr>
              <th scope="col" className={`${styles.th}`}>
                {c1}
              </th>
              {c2 && (
                <th scope="col" className={`${styles.th}`}>
                  {c2}
                </th>
              )}
              {c3 && (
                <th scope="col" className={`${styles.th}`}>
                  {c3}
                </th>
              )}
              {c4 && (
                <th scope="col" className={`${styles.th}`}>
                  {c4}
                </th>
              )}
              <th scope="col" className={`${styles.th}`}>
                {ca}
              </th>
            </tr>
          </thead>
          <tbody className={`${styles.tbody}`}>
            {data.map((data: any) => (
              <tr key={data._id}>
                <td scope="row" className={`${styles.td}`}>
                  {data.title}
                </td>
                {c2 && (
                  <td scope="row" className={`${styles.td}`}>
                    {data.book.title}
                  </td>
                )}
                {c3 && (
                  <td scope="row" className={`${styles.td}`}>
                    {data.heading1.title}
                  </td>
                )}
                <td scope="row" className={`${styles.td}`}>
                  <button
                    type="button"
                    className={`${styles.actionBTN}`}
                    onClick={() => DeleteHandle(data._id)}
                  >
                    Delete
                  </button>
                  <Link
                    href={`${updateLink}/${data._id}`}
                    //   href={updateLink}
                    className={`${styles.actionBTN}`}
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
