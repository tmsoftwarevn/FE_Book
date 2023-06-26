import { Col, Image, Modal, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "./book.scss";

const ModalGallery = (props) => {
  const { isOpen, setIsOpen, currentIndex, items, title, setCurrentIndex } =
    props;
  const [activeIndex, setActiveIndex] = useState(0);
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
      closable={false} //hide close button
      className="modal-gallery"
    >
      <Row gutter={[20, 20]}>
        <Col span={16}>
          <ImageGallery
            ref={refGallery}
            items={items}
            showPlayButton={false} //hide play button
            showFullscreenButton={false} //hide fullscreen button
            startIndex={activeIndex} // start at current index
            showThumbnails={false} //hide thumbnail
            onSlide={(activeImgae) => setActiveIndex(activeImgae)}
            slideDuration={1} //duration between slices
          />
        </Col>
        <Col span={8}>
          <div style={{ marginBottom: 10 }}>{title}</div>
          <div>
            <Row gutter={[20, 20]}>
              {items?.map((item, i) => {
                return (
                  <Col key={`image-${i}`}>
                    <Image
                      wrapperClassName={"img-normal"}
                      width={100}
                      height={100}
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
