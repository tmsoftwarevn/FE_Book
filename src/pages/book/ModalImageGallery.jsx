import { Col, Image, Modal, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "./book.scss";

const ModalGallery = (props) => {
  const { isOpen, setIsOpen, currentIndex, items, title, setCurrentIndex } =
    props;
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const refGallery = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(currentIndex);
    }
  }, [isOpen]);

  return (
    <Modal
      width={"50vw"}
      open={isOpen}
      onCancel={() => {
        setIsOpen(false);
      }}
      footer={null} //hide footer
      closable={true} //hide close button
      className="modal-gallery"
    >
      <Row gutter={[20, 20]} className="">
        <Col span={15}>
          <ImageGallery
            ref={refGallery}
            items={items}
            showPlayButton={false} //hide play button
            showFullscreenButton={true} //hide fullscreen button
            startIndex={activeIndex} // start at current index
            showThumbnails={false} //hide thumbnail
            onSlide={(activeImgae) => setActiveIndex(activeImgae)}
            slideDuration={0} //duration between slices
          />
        </Col>
        <Col span={8}>
          {/* <div style={{ marginBottom: 10 }}>{title}</div> */}
          <div className="">
            <Row gutter={[20, 20]}>
              {items?.map((item, i) => {
                return (
                  <Col key={`image-${i}`}>
                    <Image
                      wrapperClassName={"img-normal"}
                      width={100}
                      height={100}
                      style={{objectFit:"contain"}}
                      src={item.original}
                      preview={false}
                      onClick={() => {
                        refGallery.current.slideToIndex(i);
                      }}
                    />
                    <div
                      className={activeIndex === i ? "activeImgae" : ""}
                    ></div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalGallery;
