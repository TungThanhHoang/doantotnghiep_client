import React, { useState, useContext, useEffect } from "react";
import "./DetailBill.css";
import { Row, Col, Modal, message, Button } from "antd";
import { useParams } from "react-router-dom";
import { CheckOutContext } from "../../../../contexts/CheckOutContext";
import { ProductContext } from "../../../../contexts/ProductContext";
import LoadingPage from "../../LoadingPage";
import { ExclamationCircleOutlined, QrcodeOutlined } from "@ant-design/icons";
import FormatDate from "../../../../utils/FormatDate";
import CheckStatusOrder from "../../../../utils/CheckStatusOrder";
import BillItem from "../BillItem/BillItem";

const { confirm } = Modal;
function DetailBill() {
  const { loadItemBill, billItem, isLoadingBill, updateBillStateCancel } =
    useContext(CheckOutContext);
  const { formatPrice } = useContext(ProductContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadItemBill(id);
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleBillCancel = async (idBill) => {
    confirm({
      title: "Bạn có chắc chắn muốn hủy đơn hàng này",
      icon: <ExclamationCircleOutlined />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        const sendData = updateBillStateCancel(idBill);
        if (sendData) {
          message.success("Hủy đơn hàng thành công");
          // window.location.reload();
        }
      },
      onCancel() { },
    });
  };
  const ProductItem = ({
    item: {
      attributes: {
        quantity,
        product: {
          data: {
            attributes: {
              price,
              size,
              title,
              picture: {
                data: {
                  0: {
                    attributes: {
                      url
                    }
                  }
                }
              },
            }
          }
        },
      }
    },
  }) => (
    <div>
      <Row className="row-product">
        <Col xs={14} sm={8} md={8} lg={8} xl={8}>
          <div className="card-product">
            <img src={url} alt="" width={70} height={70} />
            <div>
              <span>{title}</span>
            </div>
          </div>
        </Col>
        <Col xs={10} sm={16} md={16} lg={16} xl={16}>
          <Row>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
              <div className="title-wrap ">{formatPrice.format(price)}</div>
            </Col>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
              <div className="title-wrap ">x{quantity}</div>
            </Col>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
              <div className="title-wrap ">
                {size}
              </div>
            </Col>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
              <div className="title-wrap ">{formatPrice.format(price)}</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
  return (
    <div className="detail-bill">
      <Modal
        title="Mã  QR code"
        visible={isModalVisible}
        footer={
          <Button key="ok" type="primary" onClick={handleOk}>
            Đóng
          </Button>
        }
      >
        <div>
          <div dangerouslySetInnerHTML={{ __html: billItem?.attributes?.qrCode }} />
        </div>
      </Modal>
      <h2 style={{ color: "var(--color-font-two)", fontWeight: "500" }}>
        Chi tiết đơn hàng
      </h2>
      {isLoadingBill ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="info-order">
            <div>
              <span>Mã đơn:</span>
              <span className="code-order">#{billItem?.attributes?.id_code}</span>
            </div>
            <div className="status-order">
              <div className="date-order">{FormatDate(billItem?.attributes?.createdAt)}</div>
              <div className="title-status">
                {billItem?.attributes?.status}
              </div>
            </div>
          </div>
          <Row className="card-wrap">
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div>
                <h4
                  style={{ color: "var(--color-font-two)", fontWeight: "500" }}
                >
                  Địa chỉ người nhận
                </h4>
                <div className="card-order__info">
                  <h4
                    style={{
                      color: "var(--color-font-two)",
                      fontWeight: "500",
                    }}
                  >
                    {billItem?.attributes?.userName}
                  </h4>
                  <div>
                    <span>Điện thoại:</span>
                    <span className="phone-user">{billItem?.attributes?.phone}</span>
                  </div>
                  <div>
                    <span>Địa chỉ:</span>
                    <span className="address-delivery">{billItem?.attributes?.address}</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div>
                <h4
                  style={{ color: "var(--color-font-two)", fontWeight: "500" }}
                >
                  Hình thức giao hàng
                </h4>
                <div className="card-order__info">
                  {billItem?.attributes?.status}
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div>
                <h4>Hình thức thanh toán</h4>
                <div className="card-order__info">
                  <div className="payments">
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                      alt=""
                      width={28}
                      height={28}
                    />
                    <h4
                      style={{
                        color: "var(--color-font-two)",
                        fontWeight: "500",
                      }}
                    >
                      {billItem?.attributes?.payment_method?.data?.attributes?.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-slate-800">{billItem?.attributes?.payment_status}</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row className=" my-4">
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <span className="font-medium">Lưu chú</span>
              <textarea value={billItem?.attributes?.note} rows={3} className="mt-2 w-full border p-2 rounded-md" disabled>{billItem?.attributes?.note}</textarea>
            </Col>
          </Row>
          <Row className="card-thank">
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <span>Cảm ơn bạn đã mua sắm !</span>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              {billItem?.attributes?.status === "Chờ xác nhận" ? (
                <button
                  onClick={() => {
                    handleBillCancel(id);
                  }}
                >
                  Hủy đơn hàng
                </button>
              ) : billItem?.attributes?.status === "Đã giao hàng" ? (
                <button>Mua lại</button>
              ) : (
                ""
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="view-qr" onClick={() => showModal()}>
                <QrcodeOutlined style={{ fontSize: "20px" }} />
                <div className="title-qr">Xem mã QR</div>
              </div>
            </Col>
          </Row>
          <Row className="card-title__wrap">
            <Col span={8}>
              <div className="title-column">Sản phẩm</div>
            </Col>
            <Col span={4}>
              <div className="title-column">Giá</div>
            </Col>
            <Col span={4}>
              <div className="title-column">Số lượng</div>
            </Col>
            <Col span={4}>
              <div className="title-column">Trọng lượng</div>
            </Col>
            <Col span={4}>
              <div className="title-column">Tạm tính</div>
            </Col>
          </Row>
          <div className="product-order">
            {billItem?.attributes?.items?.data?.map((item, index) => (
              <ProductItem key={index} item={item} />
            ))}
          </div>
          <div className="detail-price">
            <Row justify="end">
              <Col xs={24} sm={10} md={9} lg={9} xl={8}>
                <Row>
                  <Col span={12}>
                    <div className="column-title">Tạm tính</div>
                  </Col>
                  <Col span={12}>
                    <div className="number-column">
                      {formatPrice.format(billItem?.attributes?.sub_total)}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <div className="column-title">Phí vận chuyển</div>
                  </Col>
                  <Col span={12}>
                    <div className="number-column">
                      {formatPrice.format(billItem?.attributes?.delivery_fee)}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <div className="column-title">Khuyến mãi</div>
                  </Col>
                  <Col span={12}>
                    <div className="number-column text-red-500">
                      -{formatPrice.format(billItem?.attributes?.discount)}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <div className="column-title total-price">Tổng tiền</div>
                  </Col>
                  <Col span={12}>
                    <div className="number-column price-order">
                      {formatPrice.format(billItem?.attributes?.total)}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailBill;
