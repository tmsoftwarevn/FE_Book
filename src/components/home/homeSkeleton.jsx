import { Col, Row, Skeleton } from "antd";

const HomeSkeleton = () => {
  return (
    <Row gutter={[20, 20]} style={{ gap: 25, paddingTop: 20 }}>
      <Col lg={4} sm={0} xs={0}>
        <Skeleton.Input
          active={true}
          block={true}
          style={{ width: "100%", height: 600 }}
        />
      </Col>
      <Col lg={19} sm={24}>
        <Skeleton.Input
          active={true}
          block={true}
          style={{ width: "100%", height: 300, marginBottom: 20 }}
        />
        <br></br>
        <Skeleton.Input
          active={true}
          block={true}
          style={{ width: "100%", height: 300 }}
        />
      </Col>
    </Row>
  );
};

export default HomeSkeleton;
