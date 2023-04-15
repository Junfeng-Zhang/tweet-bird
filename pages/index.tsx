import PostFeed from "@/components/posts/PostFeed"
import Header from "@/components/Header"
import Form from "@/components/Form"

export default function Home() {
  return (
    <>
      <Header label="首页" />
      <Form placeholder="说点什么吧(#^.^#)" />
      <PostFeed />
    </>
  )
}
