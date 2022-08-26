import Head from 'next/head'

const Meta = ({ title, description, keywords }) => {
    return (
        <Head>
            <meta name="yandex-verification" content="7ba3b76dadad34d3" />
            <meta charset="UTF-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />

            <title>{`${title} | Leton-shop.ru`}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* <script type="text/javascript" >
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
            
                ym(88600356, "init", {
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });
            </script> */}
        </Head>
    );
}

export default Meta;
