<template>
  <div class="container">
    <h1>상품상세관리</h1> <!--  하단에 수정,삭제 버튼 밑에 같이.-->
      <table class="table">
        <tbody>
          <tr>
            <th scope="col" class="text-center table-primary">도서명</th>
            <td scope="col" class="text-center">{{ productDetailInfo.book_name }}</td>
            <th scope="col" class="text-center table-primary">가격</th>
            <td scope="col" class="text-center">{{ formatPrice(productDetailInfo.book_price) }}</td>
            <th scope="col" class="text-center table-primary">저자</th>
            <td scope="col" class="text-center">{{ productDetailInfo.title }}</td>
          </tr>

          <tr>
            <th colspan="2" class="text-center table-primary">ISBN</th>
            <td colspan="4">{{ productDetailInfo.isbn }}</td>
            <th colspan="2" class="text-center table-primary">출판사</th>
            <td colspan="4">{{ productDetailInfo.publ_co }}</td>
          </tr>
          <tr>
            <th colspan="2" class="text-center table-primary">도서 이미지</th>
            <td colspan="4">{{ productDetailInfo.book_img }}</td>
          </tr>

          <tr>
            <th colspan="2" class="text-center table-primary">도서 상세 설명</th>
            <td colspan="4">{{ productDetailInfo.detail_exp }}</td>
          </tr>

          <tr>
            <td colspan="6" class="text-center">
              <button class="btn btn-xs btn-info" @click="goToUpdate(productDetailInfo.pno)">수정</button>
              <button class="btn btn-xs btn-info" @click="delProduct(productDetailInfo.prdt_no)">삭제</button>
              </td>
          </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
 import axios from 'axios'

  export default {
    data(){
      return {
        productDetailInfo : {
          book_name : '',
          book_price : '',
          title : '',
          isbn : '',
          publ_co : '',
          book_img : '',
          detail_exp : ''
        }
      }
    },
    created(){
      let pno = this.$route.query.prdtNo;
      this.getproductDetailInfo(pno);
    },
    methods : {
      async getproductDetailInfo(pno){ // 1. 단건조회 선행
        let result = await axios.get('/api/product/' + pno) // 기존 BK000001 에서 받는값(bno)으로 변경
                              .catch(err => console.log(err));
      console.log(result);
      this.productDetailInfo = result.data; // 2. 여기에 담음
      },
      formatPrice(book_price) {
      if (book_price > 999) {
        let priceAry = String(book_price).split("").reverse(); //split 사용해서 앞에 String 으로 감싸주고 씀
        let idx = 0;
        while (priceAry.length > idx + 3) {
          priceAry.splice(idx + 3, 0, ',');
          idx += 4;
        }
        return priceAry.reverse().join('') + '원'
      } else {
        return book_price + '원'
      }
      },
    goToUpdate (pno) { // 작성 및 수정폼 같은 컴포넌트 사용
      this.$router.push({ path : '/admin/productInsert', query : {'prdtNo' : pno } });
    },
    delProduct (pno) { //서버에 해당 데이터 삭제
      // let pno = this.$route.query.prdtNo;
      axios.delete(`/api/product/${pno}`)
            .then(result => {
        if(result.data.affectedRows != 0 && result.data.changedRows == 0){
          alert('정상적으로 삭제되었습니다');
          this.$router.push({path : '/admin/productList'}); // 이건 꼭 보여야 하는 부분.
        }else {
          alert(`삭제되지 않았습니다.`);
        }
      }
    )}
    }
  }

</script>
