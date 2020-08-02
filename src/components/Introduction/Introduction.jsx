import React from "react";
import { IntroContainer } from "./styled";

const Introduction = () => {
  return (
    <IntroContainer>
      <div className="container">
        <div className="row">
          <div className="col-6 col-6 mt-auto mb-auto">
            <h2>Bắt đầu chuyến xe của bạn</h2>
            <p>
              Chỉ cần vài thao tác đơn giản là bạn đã có thể bắt đầu với chuyến đi. Chúng tôi có
              những Quy định cụ thể để đảm bảo lợi ích lớn nhất cho khách hàng.
            </p>
          </div>
          <div className="col-6">
            <img
              src="http://d3q2hmjnptzwta.cloudfront.net/hugo-navigation-support.png"
              alt="support"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <img
              src="http://d3q2hmjnptzwta.cloudfront.net/hugo-location-access+(1).png"
              alt="support"
            />
          </div>
          <div className="col-6 col-6 mt-auto mb-auto">
            <h2>An toàn đặt lên hàng đầu</h2>
            <p>
              Mọi chuyến xe của chúng tôi đều đã được kiểm định chất lượng trước khi khởi hành, nhằm
              đem lại sự an toàn lớn nhất dành cho khách hàng.
            </p>
          </div>
        </div>
      </div>
    </IntroContainer>
  );
};

export default Introduction;
