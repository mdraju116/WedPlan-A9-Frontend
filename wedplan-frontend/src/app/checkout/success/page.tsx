import { redirect } from 'next/navigation'

import Link from 'next/link'
import { stripe } from '@/lib/stripe'

export default async function Success({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {

    const { session_id } = await searchParams
    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const { status, customer_details: customerDetails } = await 
	stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    const customerEmail = customerDetails?.email
    if (status === 'open') {
        return redirect('/')
    }
    if (status === 'complete') {



        return (
            <section
                id="success"
                className="flex min-h-screen items-center justify-center bg-slate-950 px-4"
            >
                <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#
				18191b] p-8 text-center shadow-xl">
                   

                    <h1 className="text-2xl font-bold text-white">
                        Payment Successful!
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-gray-400">
                        Thank you for your purchase! We appreciate your business.
                    </p>

                    <div className="mt-6 rounded-lg bg-white/5 p-4">
                        <p className="text-sm leading-6 text-gray-300">
                            A confirmation email will be sent to{" "}
                            <span className="font-semibold text-white">
                                {customerEmail}
                            </span>.
                            <br /> If you have any questions, please contact us.
                        </p>
                        <Link
                            href="mailto:orders@example.com"
                            className="mt-2 inline-block text-sm font-medium text-green-400 
						hover:text-green-300"
                        >
                            orders@example.com
                        </Link>
                    </div>


                    <Link
                        href="/"
                        className="mt-7 inline-block w-full rounded-lg bg-[#068a3f] px-5 py-3 
				    text-sm font-semibold text-white transition-colors hover:bg-[#057535]"
                    >
                        Back to Home
                    </Link>
                </div>
            </section>
        );
    }
}