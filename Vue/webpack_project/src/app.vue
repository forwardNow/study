<template>
    <div>
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
</template>
<script>
export default {
    created() {

        // this.$http.get( "https://www.baidu.com" )
        //     .then( res => {
        //         console.info( res );
        //     }, error => {
        //         console.info( error );
        //     } );

        // this.$http.post( "https://www.baidu.com", {
        //     deptId: 1
        // }, {
        //     emulateJSON: true
        // } ).then( res => {
        //         console.info( res );
        // }, error => {
        //     console.info( error );
        // } );
        
        this.$axios.get( "/list", {
            params: {
                deptId: 1
            }
        } ).then( res => {
            console.info( res );
        } ).catch( error => {
            console.info( error );
        } );

        this.$axios.post( "/detail", {
            deptId: 1
        } ).then( res => {
            console.info( res );
        } ).catch( error => {
            console.info( error );
        } );
    }
}
</script>
