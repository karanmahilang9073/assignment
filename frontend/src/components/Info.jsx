function InfoCards() {
  return (
    <section className="min-h-screen bg-black flex items-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-10 w-full">
        {/* Education */}
        <div className="border border-amber-600 rounded-3xl p-16 min-h-150">
          <div className="text-center">
            <h2 className="text-5xl text-amber-600 font-bold mb-16">
              MY EDUCATION
            </h2>
          </div>

          <div className="space-y-16 text-white text-2xl">
            <div>
              <h3 className="text-amber-500 mb-2">• LLB Degree</h3>
              <p>Harvard University</p>
            </div>

            <div>
              <h3 className="text-amber-500 mb-2">
                • Criminal Law Specialization
              </h3>
              <p>Law Institute</p>
            </div>
          </div>
        </div>

        {/* Chamber */}
        <div className="border border-amber-600 rounded-3xl p-16 min-h-150">
          <div className="text-center">
            <h2 className="text-5xl text-amber-600 font-bold mb-16">
              VISIT MY CHAMBER
            </h2>
          </div>

          <div className="space-y-10 text-white text-2xl">
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
