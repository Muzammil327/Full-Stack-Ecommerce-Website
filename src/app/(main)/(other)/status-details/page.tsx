import { Container, Heading1, Heading2 } from "@/src/components/ui/ui";
import React from "react";

export default function page() {
  return (
    <main>
      <div className="hero bg-slate-200 py-40 flex items-center justify-center mb-4">
        <Heading1 className="capitalize" title="Status Order Details" />
      </div>
      <Container>
        <span>Updated: 8/19/2024</span>
        <div className="grid md:grid-cols-7 grid-cols-1 gap-4 md:my-12 my-4">
          <div className="md:col-span-5">
            <Heading2 title="Pending Order" />
            <ul className="mt-5 space-y-4 list-disc list-inside">
              <li>
                The order has been placed by the customer but has not yet been
                processed or confirmed by <strong>SMI Shop Mart</strong>.
              </li>
              <li>
                After 6 hours, the customer will receive a confirmation call. If
                confirmed, the order status will be updated to{" "}
                <strong> Confirmed</strong>.
              </li>
              <li>
                The customer can delete their order during this waiting period.
              </li>
              <li>
                The order remains in a pending state until confirmation is
                received via phone.
              </li>
            </ul>
            <Heading2 title="Confirmed Order" />
            <ul className="mt-5 space-y-4 list-disc list-inside">
              <li>
                The order has been confirmed by the customer following a phone
                confirmation after the initial 6-hour pending period.
              </li>
              <li>
                The order is now queued for packaging and will be prepared for
                shipping within 1 business day.
              </li>
            </ul>
            <Heading2 title="Shipped Order" />
            <ul className="mt-5 space-y-4 list-disc list-inside">
              <li>
                The order has been carefully packaged and dispatched from the
                warehouse.
              </li>
              <li>
                SMI Store Mart provides the customer with detailed shipment
                updates at every stage of the delivery process.
              </li>
              <li>
                The order is now in transit, making its way to the delivery
                address provided by the customer.
              </li>
            </ul>
            <Heading2 title="Delivered Order" />
            <ul className="mt-5 space-y-4 list-disc list-inside">
              <li>
                The order has been successfully delivered to the customer’s
                address.
              </li>
              <li>
                Delivery has been confirmed, marking the completion of the
                order.
              </li>
              <li>
                The customer now has the product, and the transaction is fully
                completed.
              </li>
            </ul>
            <Heading2 title="Cancelled Order" />
            <ul className="mt-5 space-y-4 list-disc list-inside">
              <li>
                The order has been cancelled either by the customer or by SMI
                Shop Mart.
              </li>
              <li>
                Cancellation may occur due to reasons such as stock
                unavailability, or a customer-initiated request.
              </li>
              <li>
                The order is no longer valid, and no further processing will
                occur.
              </li>
            </ul>
            <Heading2 title="No Return" />
            <ul className="mt-5 space-y-4 list-disc list-inside">
              <li>
                The order status has been updated to No Return when the return
                period has expired.
              </li>
              <li>
                This status indicates that the order can no longer be returned
                or exchanged.
              </li>
              <li>
                Orders are updated to this status automatically after the 5 days
                period to prevent further return requests.
              </li>
            </ul>
          </div>
          <aside className="md:col-span-2"></aside>
        </div>
      </Container>
    </main>
  );
}
