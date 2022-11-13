import { Product } from "@stripe/firestore-stripe-payments";
import React from "react";

interface Props {
  products: Product[];
}

const Table = ({ products }: Props) => {
  return (
    <table>
        <tbody>
            <tr>
                <td>Monthly Price</td>
                {products.map((product) => (
                    <td className="tableDataFeature" key={product.id}>GBP{product.prices[0].unit_amount! / 100}</td>
                ))}
            </tr>
        </tbody>
    </table>
  );
};

export default Table;
