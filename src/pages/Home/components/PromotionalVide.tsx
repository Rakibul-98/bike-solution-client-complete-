import video from '../../../assets/video/video.mp4';

function PromotionalVide() {
    return (
      <div className="w-full h-[500px] overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  
  export default PromotionalVide;
  