"use client";
export default function Error({ error }: { error: Error }) {
  return (
    <div className="m-4 font-bold">
      <p>エラー画面</p>
      <p>{error.message}</p>
    </div>
  );
}
