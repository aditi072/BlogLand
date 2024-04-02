"use strict";(self.webpackChunkmediumclone_angular=self.webpackChunkmediumclone_angular||[]).push([[269],{2269:(J,m,c)=>{c.r(m),c.d(m,{routes:()=>U});var l={};c.r(l),c.d(l,{createArticleEffect:()=>I,redirectAfterCreateEffect:()=>N});var o=c(826),i=c(6789),u=c(4755),p=c(9841),g=c(2952);const s=(0,i.R7)({source:"create article",events:{"Create article":(0,i.Ky)(),"Create article success":(0,i.Ky)(),"Create article failure":(0,i.Ky)()}});var C=c(720);const A={isSubmitting:!1,validationErrors:null},h=(0,i.Tz)({name:"createArticle",reducer:(0,i.Lq)(A,(0,i.on)(s.createArticle,e=>({...e,isSubmitting:!0})),(0,i.on)(s.createArticleSuccess,(e,n)=>({...e,isSubmitting:!1})),(0,i.on)(s.createArticleFailure,(e,n)=>({...e,isSubmitting:!1,validationErrors:n.errors})),(0,i.on)(C.hn,()=>A))}),{name:S,reducer:y,selectIsSubmitting:E,selectValidationErrors:F}=h;var t=c(2223);function x(e,n){if(1&e){const r=t.EpF();t.ynx(0),t.TgZ(1,"mc-article-form",1),t.NdJ("articleSubmit",function(f){t.CHM(r);const Y=t.oxw();return t.KtG(Y.onSubmit(f))}),t.qZA(),t.BQk()}if(2&e){const r=n.ngIf,a=t.oxw();t.xp6(1),t.Q6J("initialValues",a.initialValues)("isSubmitting",r.isSubmitting)("errors",r.backendErrors)}}let K=(()=>{class e{constructor(r){this.store=r,this.initialValues={title:"",description:"",body:"",tagList:[]},this.data$=(0,p.a)({isSubmitting:this.store.select(E),backendErrors:this.store.select(F)})}onSubmit(r){this.store.dispatch(s.createArticle({request:{article:r}}))}}return e.\u0275fac=function(r){return new(r||e)(t.Y36(i.yh))},e.\u0275cmp=t.Xpm({type:e,selectors:[["mc-create-article"]],standalone:!0,features:[t.jDz],decls:2,vars:3,consts:[[4,"ngIf"],[3,"initialValues","isSubmitting","errors","articleSubmit"]],template:function(r,a){1&r&&(t.YNc(0,x,2,3,"ng-container",0),t.ALo(1,"async")),2&r&&t.Q6J("ngIf",t.lcZ(1,1,a.data$))},dependencies:[g.E,u.ez,u.O5,u.Ov],encapsulation:2}),e})();var d=c(4004),M=c(4766),L=c(3144);let v=(()=>{class e{constructor(r){this.http=r}createArticle(r){return this.http.post(M.N.apiUrl+"/articles",r).pipe((0,d.U)(f=>f.article))}}return e.\u0275fac=function(r){return new(r||e)(t.LFG(L.eN))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac}),e})();var T=c(7701),V=c(3900),b=c(262),z=c(9646),G=c(8505);const I=(0,o.GW)((e=(0,t.f3M)(o.eX),n=(0,t.f3M)(v))=>e.pipe((0,o.l4)(s.createArticle),(0,V.w)(({request:r})=>n.createArticle(r).pipe((0,d.U)(a=>s.createArticleSuccess({article:a})),(0,b.K)(a=>(0,z.of)(s.createArticleFailure({errors:a.error.errors})))))),{functional:!0}),N=(0,o.GW)((e=(0,t.f3M)(o.eX),n=(0,t.f3M)(T.F0))=>e.pipe((0,o.l4)(s.createArticleSuccess),(0,G.b)(({article:r})=>{n.navigate(["/articles",r.slug])})),{functional:!0,dispatch:!1}),U=[{path:"",component:K,providers:[v,(0,o.y3)(l),(0,i.oY)(S,y)]}]}}]);