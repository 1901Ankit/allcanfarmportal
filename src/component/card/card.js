import "./card.css";
import "./flip-transition.css";

function Card({onClick}) {
  return (
    <>
      <div class="container">
    <div class="ticket">
      <div class="ticket-left">
        <div class="corner-seat-container">
          <div class="item">seat</div>
          <div class="lgdetail">25a</div>
        </div>
        <div class="airplane-container">
          <img src="https://assets.codepen.io/1026437/blackAirplane.png" alt="airplane-img" />
        </div>
        <div class="departure-time">
          <div class="item">departure time</div>
          <div class="lgdetail">5:19am</div>
        </div>
        <div class="departing">
          <div class="item">departing</div>
          <div class="smdetail">knoxville(TYS)</div>
        </div>
      </div>
      <div class="ticket-middle">
        <div class="passenger-name">
          <div class="item">passenger</div>
          <div class="smdetail">smith, john r</div>
        </div>
        <div class="gate">
          <div class="item">gate</div>
          <div class="lgdetail">l22</div>
        </div>
        <div class="flight">
          <div class="item">flight</div>
          <div class="lgdetail">402rd</div>
        </div>
        <div class="destination">
          <div class="item">destination</div>
          <div class="smdetail">miami(MIA)</div>
        </div>
        <div class="group">
          <div class="item">group</div>
          <div class="smdetail">3</div>
        </div>
        <div class="serial">
          <div>z8 4653 402 16waj 4798p</div>
        </div>
      </div>
      <div class="ticket-right">
        <div class="stub-flight">
          <div class="smitem">flight</div>
          <div class="exsmdetail">402rd</div>
        </div>
        <div class="stub-seat">
          <div class="smitem">seat</div>
          <div class="exsmdetail">25a</div>
        </div>
        <div class="stub-depart">
          <div class="smitem">depart</div>
          <div class="exsmdetail">5:19am</div>
        </div>
        <div class="stub-passenger">
          <div class="smitem">passenger</div>
          <div class="exsmdetail">Smith, John, R</div>
        </div>
        <div class="barcode">3859384847</div>
      </div>
    </div>
  </div>
  
    </>
    );
}

export default Card;