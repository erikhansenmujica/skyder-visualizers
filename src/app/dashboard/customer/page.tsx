"use client";
import { GetAllCustomers, GetCustomerById } from "@/actions/customers";
import localFont from "next/font/local";
import { Customer, Invoice, Order } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { GetAllOrders, GetUserOrders } from "@/actions/orders";
import { GetAllInvoices, GetUserInvoices } from "@/actions/invoices";
import Link from "next/link";
const calibri = localFont({ src: "../../../fonts/calibri-regular.ttf" });
const druk = localFont({ src: "../../../fonts/druk.wide.ttf" });
export default function ResultPage({
  searchParams: { id },
}: {
  searchParams: { id: string };
}): JSX.Element {
  const [customers, setCustomers] = useState<Customer>();

  const [orders, setOrders] = useState<Order[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  useEffect(() => {
    (async () => {
      const res = await GetCustomerById(id);
      if (res) {
        setCustomers(res);
        const resOrders = await GetUserOrders(res.email);
        if (resOrders) setOrders(resOrders);
        const resInvoices = await GetUserInvoices(id);
        if (resInvoices) setInvoices(resInvoices);
      }
    })();
  }, []);
  const sections =
    "w-[40%] h-[60vh] bg-gradient-to-r from-blue-500 to-teal-400 flex flex-col items-center justify-evenly rounded-xl shadow shadow-blue-500 m-6";
  const contentBox =
    "h-[80%] flex flex-wrap items-center justify-center overflow-scroll bg-black/30";
  const box =
    "border-2 border-white w-[40%] p-5 m-4 flex flex-col items-center rounded-xl bg-white text-black cursor-pointer hover:bg-black hover:text-white";
  const textinboxes = "break-all w-full";
  return (
    <div className={calibri.className + " text-white"}>
      <h1 className="text-3xl">Admin Dashboard</h1>
      <div className="w-screen flex flex-wrap w-screen justify-evenly">
        <div className={sections}>
          <h2 className={druk.className}>Customer: {customers?.artist}</h2>
        </div>
        <div className={sections}>
          <h2 className={druk.className}>Orders</h2>
          <div className={contentBox}>
            {orders &&
              orders.length &&
              orders.map((order, i) => (
                <div className={box} key={i}>
                  <p className={textinboxes}>
                    <span className="underline">Order Id</span>: {order.id}
                  </p>
                  <p className={textinboxes}>
                    <span className="underline">Artist Name</span>:{" "}
                    {order.artist}
                  </p>
                  <p className={textinboxes}>
                    <span className="underline">Artist Email</span>:{" "}
                    {order.email}
                  </p>
                  <p className={textinboxes}>
                    <span className="underline">Price</span>: {order.price}
                  </p>
                  <p className={textinboxes}>
                    <span className="underline">Date</span>:{" "}
                    {order.date
                      ? order.date.getDate() +
                        "/" +
                        order.date.getMonth() +
                        "/" +
                        order.date.getFullYear()
                      : "/"}
                  </p>
                  <p className={textinboxes}>
                    <span className="underline">Invoice</span>:{" "}
                    {order.invoice_id ? order.invoice_id : "undpaid"}
                  </p>
                </div>
              ))}
          </div>
        </div>
        <div className={sections}>
          <h2 className={druk.className}>Invoices</h2>
          <div className={contentBox}>
            {invoices &&
              invoices.length &&
              invoices.map((invoice, i) => (
                <div className={box} key={i}>
                  <p className={textinboxes}>
                    <span className="underline">Status</span>: {invoice.status}
                  </p>
                  <p className={textinboxes}>
                    <span className="underline">Stripe Id</span>:{" "}
                    {invoice.stripe_pi_id}
                  </p>
                  <p className={textinboxes}>
                    <span className="underline">Price</span>: {invoice.price}
                  </p>

                  <p className={textinboxes}>
                    <span className="underline">Product</span>:{" "}
                    {invoice.product_id}
                  </p>
                  <p className={textinboxes}>
                    <span className="underline">Customer</span>:{" "}
                    {invoice.customer_id}
                  </p>
                  <p className={textinboxes}>
                    <span className="underline">Order</span>: {invoice.order_id}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
