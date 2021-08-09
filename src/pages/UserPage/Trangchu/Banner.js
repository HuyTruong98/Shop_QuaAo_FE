import React, { useState } from "react";
import { Modal, Button } from "antd";
function Banner(props) {
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const handleOk = () => {
    setIsVisible(false);
  };

  const handleCancel = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div className="banner-all">
        <div className="banner-bo-suu-tap">
          <div className="col-xl-12 col-lg-12 col-md-6">
            <p>Sản phẩm nổi bật</p>
            <div className="heading">
              <a>
                {" "}
                <h1>
                  Bộ sưu tập <br /> mới nhất
                </h1>
              </a>
            </div>
          </div>
        </div>
        <div className="link-video">
          <div className="col-xl-12 col-lg-12 col-md-6">
            <a onClick={() => showModal()}>
              <img src="//bizweb.dktcdn.net/100/331/067/themes/823156/assets/i_play_video.png" />
            </a>
          </div>
        </div>
      </div>

      <Modal
        title="Video giới thiệu"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={700}
        closable={false}
      >
        <iframe
          width="100%"
          height="345"
          src="https://www.youtube.com/embed/ftrC0PcCV10"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Modal>
    </>
  );
}

export default Banner;
