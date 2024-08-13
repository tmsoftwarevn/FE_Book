import { Col, Row, Skeleton } from "antd";

const HomeSkeleton = () => {
  return (
    <Row gutter={40} style={{ paddingTop: 20 }}>
      <Col lg={5} sm={0} xs={0}>
        <Skeleton.Input
          active={true}
          block={true}
          style={{ width: "100%", height: 600 }}
        />
      </Col>
      <Col lg={18} sm={0} xs={0}>
        <Skeleton.Input
          active={true}
          block={true}
          style={{
            width: "100%",
            height: 300,
            marginBottom: "20px"
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton.Input
            active={true}
            block={true}
            style={{
              width: 220,
              height: 300,
            }}
          />
          <Skeleton.Input
            active={true}
            block={true}
            style={{
              width: 220,
              height: 300,
            }}
          />
          <Skeleton.Input
            active={true}
            block={true}
            style={{
              width: 220,
              height: 300,
            }}
          />
          <Skeleton.Input
            active={true}
            block={true}
            style={{
              width: 220,
              height: 300,
            }}
          />
        </div>

        <br></br>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Skeleton.Input
            active={true}
            block={true}
            style={{
              width: 220,
              height: 300,
            }}
          />
          <Skeleton.Input
            active={true}
            block={true}
            style={{
              width: 220,
              height: 300,
            }}
          />
          <Skeleton.Input
            active={true}
            block={true}
            style={{
              width: 220,
              height: 300,
            }}
          />
          <Skeleton.Input
            active={true}
            block={true}
            style={{
              width: 220,
              height: 300,
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default HomeSkeleton;
