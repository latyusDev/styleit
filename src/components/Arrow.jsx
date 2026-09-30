import nextButton from '../images/next2.svg'

export default function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} style={{...style,display:"block", height:"max-content", width:'max-content', borderRadius:"50%" }} onClick={onClick}>
            <img src={nextButton}  alt='next'  />

        </div>
    );
  }
  