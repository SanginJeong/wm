import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import { Routes, Route } from "react-router";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/category/:slug" element={<>카테고리</>} />
        <Route path="/search" element={<>검색 결과</>} />
        <Route path="/product/:id" element={<>상품 상세</>} />
        <Route path="/cart" element={<>장바구니</>} />

        <Route path="/order">
          <Route index element={<>주문 페이지</>} />
          <Route path="payment" element={<>결제 페이지</>} />
          <Route path="complete" element={<>주문 완료</>} />
        </Route>

        <Route path="/mypage" element={<>마이페이지 레이아웃</>}>
          <Route index element={<>대시보드</>} />
          <Route path="orders" element={<>주문 내역</>} />
          <Route path="wishlist" element={<>위시리스트</>} />
          <Route path="address" element={<>배송지 관리</>} />
        </Route>

        <Route path="/auth">
          <Route path="login" element={<>로그인</>} />
          <Route path="signup" element={<>회원가입</>} />
          <Route path="forgot-password" element={<>비밀번호 재설정</>} />
        </Route>

        <Route path="/FAQ" element={<>자주 묻는 질문</>} />
      </Route>

      <Route path="*" element={<>404 Not Found</>} />
      <Route path="/admin" element={<>관리자 페이지</>} />
    </Routes>
  );
};

export default App;
