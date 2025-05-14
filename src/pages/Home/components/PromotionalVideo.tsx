function PromotionalVideo() {
  return (
    <div className="h-[500px] flex items-center overflow-clip mt-20">
      <div className="w-full h-[900px]">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/-pR96_U1zGE?autoplay=1&loop=1&mute=1&controls=0&playlist=-pR96_U1zGE"
          title="YouTube video player"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default PromotionalVideo;
