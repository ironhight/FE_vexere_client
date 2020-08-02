import React from "react";
import { SummaryContainer } from "./styled";

const Summary = () => {
  return (
    <SummaryContainer>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <img
              src="http://d3q2hmjnptzwta.cloudfront.net/img_mac.png"
              alt="imac"
              width="100%"
              height="100%"
            />
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <h3>677</h3>
                <strong>Hành khách</strong>
                <p>
                  Hàng nghìn lượt khách tin tưởng chúng tôi để tìm những chuyến xe với chất lượng
                  tốt nhất.
                </p>
              </div>
              <div className="col-6">
                <h3>476</h3>
                <strong>Bến xe</strong>
                <p>
                  Hệ thống của chúng tôi kết nối hàng trăm bến xe, đến mỗi tỉnh thành sẵn sàng phục
                  vụ nhu cầu đi lại mỗi ngày.
                </p>
              </div>
              <div className="col-6">
                <h3>456</h3>
                <strong>Chuyến xe</strong>
                <p>Số liệu này cho chúng tôi biết bạn đã đến nơi an toàn.</p>
              </div>
              <div className="col-6">
                <h3>4385.32</h3>
                <strong>Khí CO2 được giảm (kg)</strong>
                <p>
                  Chúng ta đã góp phần làm giảm lượng khí CO2 trung bình mỗi ngày. Trái Đất sẽ rất
                  biết ơn chúng ta về điều này.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SummaryContainer>
  );
};

export default Summary;
