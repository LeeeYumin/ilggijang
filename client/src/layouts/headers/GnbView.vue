
import { turn } from 'core-js/core/array';
<template>
    <div>
        <div>
            <b-button-group>
                <router-link to="/login">
            <b-button variant="outline-primary">
                로그인
            </b-button></router-link>
            <b-button variant="outline-primary">
                회원가입
            </b-button>
            <b-button variant="outline-primary">
                장바구니
            </b-button>
            </b-button-group>
        </div>
    </div>
</template>

<style scoped>
div {
    text-align: right;
}
</style>
