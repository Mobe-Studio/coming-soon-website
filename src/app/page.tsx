export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-6 lg:p-20">
      <div></div>
      <div className="flex max-w-[300px] flex-col items-center gap-6 md:max-w-[500px] md:gap-12 lg:max-w-[700px] lg:gap-16">
        <h1>mobe studio</h1>
        <p className="text-center text-2xl font-light md:text-5xl lg:text-6xl">
          Digital Experience studio based in Bergamo (Italy)
        </p>
      </div>
      <p className="text-lg font-normal uppercase md:text-3xl lg:text-4xl">Online soon</p>
    </main>
  );
}
