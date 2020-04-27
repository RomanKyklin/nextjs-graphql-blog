import Head from "next/dist/next-server/lib/head";
import Layout from "../../client/layouts/layout";
import Posts from "../../client/components/posts";
import axios from "axios";

function Index({posts}) {

    return (
        <Layout>
            <Head>
                <title>Some posts page</title>
            </Head>
            <Posts posts={posts}/>
        </Layout>
    );
}

export async function getServerSideProps() {
    const query = `
        query {
            posts {
                id
                title
                text
            }
        }
    `;
    const res = await axios.post(process.env.API_URL, {query});
    const {posts} = res.data.data;

    return {
        props: {
            posts,
        },
    }
}

export default Index;
