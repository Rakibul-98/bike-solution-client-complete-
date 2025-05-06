export default function BuyingGuide() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6 mt-8">
      <h2 className="text-2xl font-bold border-b pb-2">🚴‍♂️ Bike Buying Guide</h2>

      <section>
        <h3 className="text-xl font-semibold mb-2">🔍 Understand Your Needs</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Are you commuting, exercising, or exploring off-road trails?</li>
          <li>Do you prefer speed, comfort, or versatility?</li>
          <li>
            Choose the right type: road bike, mountain bike, hybrid, or e-bike.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-2">
          💡 Cautions Before Buying
        </h3>
        <ul className=" list-inside space-y-1 text-red-600">
          <li>⚠️ Avoid bikes with no warranty or unclear return policies.</li>
          
          <li>
            ⚠️ Beware of too-good-to-be-true deals — especially from unverified
            sellers.
          </li>
        </ul>
      </section>
    </div>
  );
}
