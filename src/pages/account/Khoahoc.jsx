import KhoahocAccount from "../../components/khoa-hoc-account/KhoahocAccount";
import "./Khoahoc.scss";

const KhoahocActive = () => {
  const a = [1, 2, 3];
  return (
    <div className="khoa-hoc">
      <div className="khoa-hoc_title font-semibold" style={{ padding: "20px" }}>
        Khóa học đã đăng ký
      </div>
      <div className="khoa-hoc_content">
        <div className="row">
          {a.map((item, idx) => {
            return (
              <>
                <div className="col-sm-6 mt-3">
                  <KhoahocAccount />
                </div>
              </>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default KhoahocActive;
