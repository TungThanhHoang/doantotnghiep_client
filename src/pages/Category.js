import React, { useState, useEffect, useContext, useCallback } from "react";
import { Row, Col, Slider, Select, Spin } from "antd";
import "./Category.css";
import { Filter, X } from "react-feather";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../contexts/CategoryContext";
import CategoryProductItem from "../components/layouts/CategoryProductItem";
import { ProductContext } from "../contexts/ProductContext";
import LoadingPage from "../components/layouts/LoadingPage";
import Lottie from "react-lottie";
import empty from "../assets/empty1.json";
import { AuthContext } from "../contexts/AuthContext";
import slug from "slug";
const { Option } = Select;
function Category() {
  const { id } = useParams();

  const {
    authState: {
      user: { ward },
    },
  } = useContext(AuthContext);
  const {
    categoryState: { productFilter },
    setMaxPrice,
    setMinPrice,
    loadOneCategory,
    loadProductFilter,
    isLoadingItem,
    isLoading,
  } = useContext(CategoryContext);
  const { formatPrice } = useContext(ProductContext);
  const [CountPrice, setCountPrice] = useState([0, 100000]);
  const [modalFilter, setModalFilter] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: empty,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const getWard = slug(ward);
    loadOneCategory(id);
    loadProductFilter(id, getWard);
  }, []);

  const handleFilter = useCallback(() => {
    const getWard = slug(ward);
    loadProductFilter(id, getWard);
  }, [CountPrice]);

  const handleOnChange = (input) => {
    setCountPrice(input);
    setMinPrice(input[0]);
    setMaxPrice(input[1]);
  };
  console.log(productFilter);
  return (
    <>
      {isLoading ? (
        <div className="spin-load">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}

      <div className="container category-wrap">
        {modalFilter ? (
          <div className="modal-filter ">
            <div className="filter-mobile__top">
              <span className="title-filter-mobile">L???c s???n ph???m</span>
              <X
                size={30}
                style={{ color: "var(--color-gray)" }}
                onClick={() => setModalFilter(!modalFilter)}
              />
            </div>
            <div className="pd-2">
              <h3 className="title-filter">L???c theo gi??</h3>
              <Slider
                min={0}
                max={500000}
                range={{ draggableTrack: false }}
                defaultValue={[0, 100000]}
                onChange={handleOnChange}
              />
              <div className="result-filter">
                Gi?? t???: {formatPrice.format(CountPrice[0])} -
                {formatPrice.format(CountPrice[1])}
              </div>
              <h3 className="title-filter">L???c theo th????ng hi???u</h3>
              <div className="checkbox-filter">
                <input type="checkbox" />
                <div>M??u ?????</div>
              </div>
              <div className="checkbox-filter">
                <input type="checkbox" />
                <div>M??u v??ng</div>
              </div>
              <div className="checkbox-filter">
                <input type="checkbox" />
                <div>M??u xanh</div>
              </div>
              <div className="checkbox-filter">
                <input type="checkbox" />
                <div>M??u cam</div>
              </div>
            </div>
            <button
              onClick={() => handleFilter()}
              className="btn-filter btn-filter__mobile"
            >
              L???c s???n ph???m
            </button>
          </div>
        ) : (
          ""
        )}
        <Row className="category">
          <Col lg={6} xl={6}>
            <div className="main-left">
              <div className="pd-2">
                <h3 className="title-filter text-lg">L???c theo gi??</h3>
                <Slider
                  min={0}
                  max={500000}
                  range={{ draggableTrack: false }}
                  defaultValue={[0, 100000]}
                  onChange={handleOnChange}
                />
                <div className="result-filter">
                  Gi?? t???: {formatPrice.format(CountPrice[0])} - {""}
                  {formatPrice.format(CountPrice[1])}
                </div>
                <h3 className="title-filter text-lg">L???c theo d??n nh??n</h3>
                <div className="checkbox-filter">
                  <input type="checkbox" />
                  <div>S???n ph???m n???i b???t</div>
                </div>
                <div className="checkbox-filter">
                  <input type="checkbox" />
                  <div>B??n ch???y</div>
                </div>
                <div className="checkbox-filter">
                  <input type="checkbox" />
                  <div>S???n ph???m ?????c quy???n</div>
                </div>
                <div className="checkbox-filter">
                  <input type="checkbox" />
                  <div>S???n ph???m th????ng hi???u</div>
                </div>
              </div>
              <button onClick={() => handleFilter()} className="w-full text-gray-700 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">
                L???c s???n ph???m
              </button>
              <div className="mt-5">
                <div className="flex items-center gap-5 border py-3 px-3 rounded-md">
                  <div className="rounded-full w-30 h-30 bg-gray-100 p-4">
                    <svg width="35px" height="35px" viewBox="0 0 50 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="transform scale-75 xl:scale-90 3xl:scale-100"><path d="M31.6597 28.3612C31.6597 24.9964 34.3973 22.2587 37.7621 22.2587C41.1269 22.2587 43.8646 24.9964 43.8646 28.3612C43.8646 31.726 41.1275 34.4637 37.7621 34.4637C34.3973 34.4637 31.6597 31.726 31.6597 28.3612ZM34.4109 28.3612C34.4109 30.2095 35.9138 31.7124 37.7621 31.7124C39.6105 31.7124 41.1134 30.2096 41.1134 28.3612C41.1134 26.5129 39.6105 25.01 37.7621 25.01C35.9138 25.01 34.4109 26.5129 34.4109 28.3612Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M10.1267 28.3612C10.1267 24.9964 12.8643 22.2587 16.2291 22.2587C19.5939 22.2587 22.3316 24.9964 22.3316 28.3612C22.3316 31.726 19.5939 34.4637 16.2291 34.4637C12.8643 34.4637 10.1267 31.726 10.1267 28.3612ZM12.8779 28.3612C12.8779 30.2095 14.3808 31.7124 16.2291 31.7124C18.0775 31.7124 19.5804 30.2096 19.5804 28.3612C19.5804 26.5128 18.077 25.01 16.2291 25.01C14.3808 25.01 12.8779 26.5129 12.8779 28.3612Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M39.8056 6.21277L39.7502 6.10261H39.6269H32.5003V3.35137H40.5985C41.1186 3.35137 41.5941 3.64441 41.828 4.10898L46.4649 13.3313L44.0061 14.5676L39.8056 6.21277Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M21.3131 29.7894V27.0381H32.8352V29.7894H21.3131Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M6.04005 27.0381H11.5021C12.262 27.0381 12.8778 27.6539 12.8778 28.4137C12.8778 29.1735 12.262 29.7893 11.5022 29.7893H6.04005C5.28029 29.7893 4.66448 29.1735 4.66448 28.4137C4.66448 27.6539 5.28021 27.0381 6.04005 27.0381Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M46.4115 13.3366L46.4117 13.3368L49.5108 17.3283C49.6979 17.5695 49.7997 17.8667 49.7997 18.1721V28.4134C49.7996 29.1732 49.1838 29.789 48.424 29.789H42.4892C41.7295 29.789 41.1136 29.1732 41.1136 28.4134C41.1136 27.6536 41.7294 27.0378 42.4892 27.0378H46.8484H47.0484V26.8378V18.7118V18.6433L47.0064 18.5892L44.7118 15.6334L44.6518 15.556H44.5538H32.3002C31.5405 15.556 30.9247 14.9403 30.9247 14.1804V3.15114V2.95114H30.7247H6.04005C5.2803 2.95114 4.66448 2.33532 4.66448 1.57557C4.66448 0.815813 5.28021 0.2 6.04005 0.2H32.3003C33.0601 0.2 33.6759 0.815731 33.6759 1.57557V12.6049V12.8049H33.8759H45.3254C45.7507 12.8049 46.1518 13.0012 46.4115 13.3366Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M12.7721 20.4305V20.4306C12.7721 21.1903 12.1564 21.8061 11.3966 21.8061H4.14878C3.38902 21.8061 2.77321 21.1904 2.77321 20.4306C2.77321 19.6708 3.38894 19.055 4.14878 19.055H11.3967C12.1564 19.055 12.7722 19.6708 12.7721 20.4305Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M1.57557 12.8576H15.0209C15.7807 12.8576 16.3964 13.4735 16.3964 14.2333C16.3964 14.993 15.7807 15.6088 15.0209 15.6088H1.57557C0.815813 15.6088 0.2 14.9931 0.2 14.2333C0.2 13.4734 0.815829 12.8576 1.57557 12.8576Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M4.14878 6.66033H17.5941C18.3539 6.66033 18.9697 7.27616 18.9696 8.03588C18.9696 8.79566 18.3539 9.41147 17.5941 9.41147H4.14878C3.38902 9.41147 2.77321 8.79574 2.77321 8.0359C2.77321 7.27614 3.38894 6.66033 4.14878 6.66033Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path></svg>
                  </div>
                  <div className="font-medium text-base">Giao h??ng nhanh ch??ng</div>
                </div>
                <div className="flex items-center gap-5 border py-3 px-3 rounded-md mt-3">
                  <div className="rounded-full w-30 h-30 bg-gray-100 p-4">
                    <svg width="35px" height="35px" viewBox="0 0 43 41" fill="none" xmlns="http://www.w3.org/2000/svg" class="transform scale-75 xl:scale-90 3xl:scale-100"><path d="M38.8132 16.1527C39.5556 15.429 39.8177 14.3669 39.4974 13.3809C39.177 12.3949 38.3406 11.6898 37.3147 11.5408L28.3435 10.2372C28.1674 10.2117 28.0152 10.1011 27.9364 9.94142L23.9244 1.81228C23.4657 0.882577 22.5366 0.305054 21.4998 0.305054C20.463 0.305054 19.534 0.882577 19.0752 1.81228L15.0632 9.9415C14.9843 10.1011 14.8322 10.2117 14.656 10.2373L5.68502 11.5408C4.65906 11.6898 3.8228 12.3949 3.50233 13.3809C3.18186 14.3669 3.44403 15.429 4.18652 16.1527L10.6781 22.4804C10.8055 22.6047 10.8637 22.7836 10.8336 22.9591L9.30111 31.8939C9.1259 32.9158 9.53798 33.929 10.3767 34.5384C11.2155 35.1479 12.3068 35.2267 13.2243 34.7443L21.2482 30.5259C21.4058 30.443 21.5939 30.443 21.7516 30.5259L29.7756 34.7443C30.1747 34.9541 30.6065 35.0578 31.0363 35.0578C31.5945 35.0578 32.1491 34.8829 32.6229 34.5383C33.4616 33.9288 33.8738 32.9155 33.6985 31.8938L32.1661 22.959C32.136 22.7835 32.1942 22.6046 32.3216 22.4803L38.8132 16.1527ZM30.0343 23.3248L31.5668 32.2598C31.618 32.5588 31.4334 32.7293 31.3517 32.7886C31.2698 32.8479 31.0506 32.9709 30.7821 32.8297L22.7582 28.6112C22.3643 28.4042 21.9322 28.3006 21.5 28.3006C21.0678 28.3006 20.6356 28.4042 20.2418 28.6112L12.2179 32.8295C11.9493 32.9707 11.7301 32.8478 11.6484 32.7884C11.5666 32.7291 11.3819 32.5586 11.4333 32.2596L12.9657 23.3248C13.1162 22.4475 12.8256 21.5529 12.1881 20.9316L5.69655 14.6039C5.4793 14.392 5.52847 14.1456 5.55978 14.0495C5.59093 13.9533 5.69607 13.725 5.99628 13.6815L14.9672 12.3779C15.848 12.2499 16.6091 11.6971 17.0031 10.8988L21.0151 2.76954C21.1494 2.49751 21.3989 2.46812 21.5001 2.46812C21.601 2.46812 21.8506 2.49743 21.9849 2.76954V2.76962L25.9969 10.8988C26.3908 11.6971 27.1519 12.25 28.0327 12.378L37.0037 13.6815C37.304 13.7251 37.409 13.9534 37.4402 14.0496C37.4715 14.1458 37.5207 14.3922 37.3034 14.604L30.8119 20.9317C30.1744 21.5529 29.8838 22.4475 30.0343 23.3248Z" fill="#FF7B7B" stroke="#FF7B7B" stroke-width="0.3"></path><path d="M34.1349 1.81171C33.6516 1.46064 32.9753 1.56779 32.6242 2.05098L31.4762 3.63108C31.1251 4.11427 31.2322 4.79069 31.7154 5.14176C31.9075 5.28117 32.1299 5.34836 32.3503 5.34836C32.6848 5.34836 33.0145 5.19373 33.2261 4.90256L34.3742 3.32246C34.7253 2.83919 34.6182 2.16277 34.1349 1.81171Z" fill="#FF7B7B" stroke="#FF7B7B" stroke-width="0.3"></path><path d="M11.5193 3.62474L10.3712 2.04464C10.0202 1.56161 9.3439 1.45446 8.86055 1.80537C8.37736 2.15643 8.27021 2.83285 8.62128 3.31604L9.76936 4.89614C9.98101 5.18755 10.3108 5.3421 10.6453 5.3421C10.8658 5.3421 11.0882 5.27491 11.2801 5.13542C11.7633 4.78443 11.8705 4.10801 11.5193 3.62474Z" fill="#FF7B7B" stroke="#FF7B7B" stroke-width="0.3"></path><path d="M4.96802 24.5702C4.78344 24.0022 4.17332 23.6913 3.60517 23.8759L1.74759 24.4795C1.17944 24.6641 0.868656 25.2743 1.05324 25.8423C1.2017 26.2995 1.62571 26.59 2.0816 26.59C2.19235 26.59 2.30502 26.5728 2.41609 26.5367L4.27366 25.9331C4.84173 25.7485 5.1526 25.1384 4.96802 24.5702Z" fill="#FF7B7B" stroke="#FF7B7B" stroke-width="0.3"></path><path d="M21.5005 36.5786C20.9032 36.5786 20.4189 37.0628 20.4189 37.6601V39.6134C20.4189 40.2107 20.9032 40.6949 21.5005 40.6949C22.0978 40.6949 22.582 40.2107 22.582 39.6134V37.6601C22.582 37.0628 22.0979 36.5786 21.5005 36.5786Z" fill="#FF7B7B" stroke="#FF7B7B" stroke-width="0.3"></path><path d="M41.2525 24.4811L39.395 23.8775C38.8271 23.6931 38.2167 24.0038 38.0321 24.5719C37.8475 25.1401 38.1583 25.7502 38.7265 25.9348L40.5841 26.5384C40.6951 26.5745 40.8077 26.5916 40.9185 26.5916C41.3744 26.5916 41.7984 26.301 41.9469 25.8439C42.1315 25.2758 41.8206 24.6657 41.2525 24.4811Z" fill="#FF7B7B" stroke="#FF7B7B" stroke-width="0.3"></path></svg>
                  </div>
                  <div className="font-medium text-base">S???n ph???m ch???t l?????ng</div>
                </div>
                <div className="flex items-center gap-5 border py-3 px-3 rounded-md mt-3">
                  <div className="rounded-full w-30 h-30 bg-gray-100 p-4">
                  <svg width="35px" height="35px" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" class="transform scale-75 xl:scale-90 3xl:scale-100"><path d="M29.9678 10.9783C29.9678 4.92482 25.0427 0 18.9896 0C12.9361 0 8.01128 4.92482 8.01128 10.9783C8.01128 14.7278 9.90125 18.0439 12.7778 20.0251C10.092 20.952 7.63004 22.4831 5.56177 24.5513C1.9752 28.1379 0 32.9067 0 37.9788H2.96701C2.96701 29.1442 10.1546 21.9566 18.9896 21.9566C25.0427 21.9566 29.9678 17.0318 29.9678 10.9783ZM18.9896 18.9896C14.5721 18.9896 10.9783 15.3958 10.9783 10.9783C10.9783 6.56082 14.5721 2.96701 18.9896 2.96701C23.4067 2.96701 27.0005 6.56082 27.0005 10.9783C27.0005 15.3958 23.4067 18.9896 18.9896 18.9896ZM38 27.2974L31.0168 34.2807L28.9186 32.1825L32.3945 28.7067H29.8212C26.2662 28.7067 23.3714 31.5992 23.3685 35.1542L23.3659 37.98L20.3988 37.9777L20.4012 35.1516C20.4055 29.9618 24.6313 25.7394 29.8212 25.7394H32.246L28.9186 22.412L31.0168 20.3142L38 27.2974Z" fill="#F38E00" stroke="#F3F6F8" stroke-width="0.4"></path></svg>
                  </div>
                  <div className="font-medium text-base">D???ch v??? v?????t tr???i</div>
                </div>
                <div className="flex items-center gap-5 border py-3 px-3 rounded-md mt-3">
                  <div className="rounded-full w-30 h-30 bg-gray-100 p-4">
                    <svg width="35px" height="35px" viewBox="0 0 50 35" fill="none" xmlns="http://www.w3.org/2000/svg" class="transform scale-75 xl:scale-90 3xl:scale-100"><path d="M31.6597 28.3612C31.6597 24.9964 34.3973 22.2587 37.7621 22.2587C41.1269 22.2587 43.8646 24.9964 43.8646 28.3612C43.8646 31.726 41.1275 34.4637 37.7621 34.4637C34.3973 34.4637 31.6597 31.726 31.6597 28.3612ZM34.4109 28.3612C34.4109 30.2095 35.9138 31.7124 37.7621 31.7124C39.6105 31.7124 41.1134 30.2096 41.1134 28.3612C41.1134 26.5129 39.6105 25.01 37.7621 25.01C35.9138 25.01 34.4109 26.5129 34.4109 28.3612Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M10.1267 28.3612C10.1267 24.9964 12.8643 22.2587 16.2291 22.2587C19.5939 22.2587 22.3316 24.9964 22.3316 28.3612C22.3316 31.726 19.5939 34.4637 16.2291 34.4637C12.8643 34.4637 10.1267 31.726 10.1267 28.3612ZM12.8779 28.3612C12.8779 30.2095 14.3808 31.7124 16.2291 31.7124C18.0775 31.7124 19.5804 30.2096 19.5804 28.3612C19.5804 26.5128 18.077 25.01 16.2291 25.01C14.3808 25.01 12.8779 26.5129 12.8779 28.3612Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M39.8056 6.21277L39.7502 6.10261H39.6269H32.5003V3.35137H40.5985C41.1186 3.35137 41.5941 3.64441 41.828 4.10898L46.4649 13.3313L44.0061 14.5676L39.8056 6.21277Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M21.3131 29.7894V27.0381H32.8352V29.7894H21.3131Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M6.04005 27.0381H11.5021C12.262 27.0381 12.8778 27.6539 12.8778 28.4137C12.8778 29.1735 12.262 29.7893 11.5022 29.7893H6.04005C5.28029 29.7893 4.66448 29.1735 4.66448 28.4137C4.66448 27.6539 5.28021 27.0381 6.04005 27.0381Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M46.4115 13.3366L46.4117 13.3368L49.5108 17.3283C49.6979 17.5695 49.7997 17.8667 49.7997 18.1721V28.4134C49.7996 29.1732 49.1838 29.789 48.424 29.789H42.4892C41.7295 29.789 41.1136 29.1732 41.1136 28.4134C41.1136 27.6536 41.7294 27.0378 42.4892 27.0378H46.8484H47.0484V26.8378V18.7118V18.6433L47.0064 18.5892L44.7118 15.6334L44.6518 15.556H44.5538H32.3002C31.5405 15.556 30.9247 14.9403 30.9247 14.1804V3.15114V2.95114H30.7247H6.04005C5.2803 2.95114 4.66448 2.33532 4.66448 1.57557C4.66448 0.815813 5.28021 0.2 6.04005 0.2H32.3003C33.0601 0.2 33.6759 0.815731 33.6759 1.57557V12.6049V12.8049H33.8759H45.3254C45.7507 12.8049 46.1518 13.0012 46.4115 13.3366Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M12.7721 20.4305V20.4306C12.7721 21.1903 12.1564 21.8061 11.3966 21.8061H4.14878C3.38902 21.8061 2.77321 21.1904 2.77321 20.4306C2.77321 19.6708 3.38894 19.055 4.14878 19.055H11.3967C12.1564 19.055 12.7722 19.6708 12.7721 20.4305Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M1.57557 12.8576H15.0209C15.7807 12.8576 16.3964 13.4735 16.3964 14.2333C16.3964 14.993 15.7807 15.6088 15.0209 15.6088H1.57557C0.815813 15.6088 0.2 14.9931 0.2 14.2333C0.2 13.4734 0.815829 12.8576 1.57557 12.8576Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path><path d="M4.14878 6.66033H17.5941C18.3539 6.66033 18.9697 7.27616 18.9696 8.03588C18.9696 8.79566 18.3539 9.41147 17.5941 9.41147H4.14878C3.38902 9.41147 2.77321 8.79574 2.77321 8.0359C2.77321 7.27614 3.38894 6.66033 4.14878 6.66033Z" fill="#0095E7" stroke="white" stroke-width="0.4"></path></svg>
                  </div>
                  <div className="font-medium text-base">S???n ph???m an to??n</div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={18} xl={18}>
            <div className="main-right">
              <div
                className="bg-img"
                style={{
                  backgroundImage: `url(../../banner-detail.jpg)`,
                  width: "100%",
                  height: "180px",
                  borderRadius: 8,
                }}
              ></div>
              <div className="card-select">
                <Row justify="end" align="middle">
                  <Col sm={14} xs={12} md={12} lg={12} xl={12}>
                    <div
                      className="filter-mobile"
                      onClick={() => setModalFilter(!modalFilter)}
                    >
                      <Filter
                        size={18}
                        style={{
                          color: "var(--color-font-two)",
                          marginRight: ".3rem",
                        }}
                      />{" "}
                      <span>L???c s???n ph???m</span>
                    </div>
                  </Col>
                  <Col sm={10} xs={12} md={12} lg={12} xl={12}>
                    <div className="card-select__view">
                      <Select defaultValue="S???p x???p theo th??? t??? m???i nh???t">
                        <Option value="S???p x???p theo th??? t??? m???i nh???t">
                          S???p x???p theo th??? t??? m???i nh???t
                        </Option>
                        <Option value="S???p x???p theo th??? t??? c?? nh???t">
                          S???p x???p theo th??? t??? c?? nh???t
                        </Option>
                      </Select>
                    </div>
                  </Col>
                </Row>
              </div>
              <h2 className="title-view text-xl font-medium">S???n ph???m</h2>
              {isLoadingItem ? <LoadingPage /> : ""}
              <Row className="box-product">
                {productFilter?.length === 0 && (
                  <Lottie options={defaultOptions} height={200} width={200} />
                )}
                {productFilter?.map((item) => {
                  return <CategoryProductItem key={item.id} product={item} />;
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Category;
