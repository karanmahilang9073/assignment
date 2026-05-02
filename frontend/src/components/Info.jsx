function InfoCards() {
  return (
    <section className="bg-linear-to-l from-orange-900 to-black py-12 max-h-110">
      <div className="w-250 mx-auto grid md:grid-cols-2 gap-8 px-6  ">

        {/* Education */}
        <div className="border border-amber-600 rounded-2xl p-6">
          <div className="text-center">
            <h2 className="text-2xl text-amber-600 font-bold mb-6">MY EDUCATION</h2>
          </div>

          <div className="space-y-6 text-white text-base">
            <div>
              <h3 className="text-amber-500 mb-1">• LLB Degree</h3>
              <p>Harvard University</p>
            </div>

            <div>
              <h3 className="text-amber-500 mb-1">• Criminal Law Specialization</h3>
              <p>Law Institute</p>
            </div>
          </div>
        </div>

        {/* Chamber */}
        <div className="border border-amber-600 rounded-2xl p-6">
          <div className="text-center">
            <h2 className="text-2xl text-amber-600 font-bold mb-6">VISIT MY CHAMBER</h2>
          </div>

          <div className="space-y-2 text-white text-base">
            <p>221B Legal Street</p>
            <p>Mon - Fri : 10AM - 6PM</p>
            <p>+91 9999999999</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InfoCards;
