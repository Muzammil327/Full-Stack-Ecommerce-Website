import React from "react";

export default function Table1({ userProfile }: any) {
  return (
    <>
      <tbody>
        <TableRow label="User Name" value={userProfile?.username || ""} />
        <TableRow label="Email" value={userProfile?.email || ""} />
        <TableRow label="Address 1" value={userProfile?.addressLine1 || ""} />
        <TableRow label="Address 2" value={userProfile?.addressLine2 || ""} />
        <TableRow
          label="Additional Info"
          value={userProfile?.additionalInfo || ""}
        />
        <TableRow label="Country" value={userProfile?.country || ""} />
        <TableRow label="City" value={userProfile?.city || ""} />
        <TableRow
          label="Postal/Zip Code"
          value={userProfile?.postalCode || ""}
        />
        <TableRow label="Phone Number 1" value={userProfile?.phone1 || ""} />
        <TableRow label="Phone Number 2" value={userProfile?.phone2 || ""} />
        <TableRow
          label="Join"
          value={
            userProfile?.createdAt
              ? new Date(userProfile.createdAt).toISOString().substring(0, 10)
              : ""
          }
        />
      </tbody>
    </>
  );
}
function TableRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {label}
      </th>
      <td className="px-6 py-4">{value}</td>
    </tr>
  );
}
