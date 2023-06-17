function ServerDown() {

  return (
    <div className="flex justify-center flex-col w-full h-full p-6 mt-9">
      <h1 className="m-auto text-4xl font-semibold">Server Down</h1>
      <h3 className="m-auto text-1xl font-medium p-6">
        Sorry we werent able to handle your request
        <br />
        Try again later ⌛
      </h3>
    </div>
  )

}

export default ServerDown;