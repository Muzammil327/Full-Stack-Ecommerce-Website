"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true); // Update loading state when data fetching is complete
        const response = await axios.get("/api/products/addToCart/singleUser");
        setCart(response.data.cart);
        setIsLoading(false); // Update loading state when data fetching is complete
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Error fetching cart. Please try again later.");
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);
  return (
    <div className="ml-4 flow-root lg:ml-6">
      {isLoading ? (
        // Show loading spinner while data is being fetched
        <div className="spinner-border text-primary">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <a href="/cart" className="group -m-2 flex items-center p-2">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <clipPath id="clip-shoppingcart">
                <rect width="32" height="32" />
              </clipPath>
            </defs>
            <g id="shoppingcart" clipPath="url(#clip-shoppingcart)">
              <g
                id="Group_2537"
                data-name="Group 2537"
                transform="translate(0 -260)"
              >
                <g id="Group_2520" data-name="Group 2520">
                  <g id="Group_2519" data-name="Group 2519">
                    <g id="Group_2518" data-name="Group 2518">
                      <g id="Group_2517" data-name="Group 2517">
                        <g id="Group_2516" data-name="Group 2516">
                          <g id="Group_2515" data-name="Group 2515">
                            <g id="Group_2514" data-name="Group 2514">
                              <g id="Group_2513" data-name="Group 2513">
                                <path
                                  id="Path_3885"
                                  data-name="Path 3885"
                                  d="M28.6,264.583H9.979a1,1,0,0,0-1-1H3.4a1,1,0,1,0,0,2h2.31a1.071,1.071,0,0,0-.011.126l1.274,10.052a3.573,3.573,0,0,0-.74,2.177,3.65,3.65,0,0,0,3.646,3.645H28.209a1,1,0,1,0,0-2H9.875a1.64,1.64,0,0,1-1.433-.852l20.3-2.76a1,1,0,0,0,.865-.992v-9.4A1,1,0,0,0,28.6,264.583Zm-1,9.523-18.51,2.517-1.272-10.04H27.6Z"
                                  fill="#344952"
                                />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <g id="Group_2528" data-name="Group 2528">
                  <g id="Group_2527" data-name="Group 2527">
                    <g id="Group_2526" data-name="Group 2526">
                      <g id="Group_2525" data-name="Group 2525">
                        <g id="Group_2524" data-name="Group 2524">
                          <g id="Group_2523" data-name="Group 2523">
                            <g id="Group_2522" data-name="Group 2522">
                              <g id="Group_2521" data-name="Group 2521">
                                <path
                                  id="Path_3886"
                                  data-name="Path 3886"
                                  d="M10.4,282a3.208,3.208,0,1,0,3.208,3.208A3.212,3.212,0,0,0,10.4,282Zm0,4.417a1.208,1.208,0,1,1,1.208-1.209A1.209,1.209,0,0,1,10.4,286.417Z"
                                  fill="#344952"
                                />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <g id="Group_2536" data-name="Group 2536">
                  <g id="Group_2535" data-name="Group 2535">
                    <g id="Group_2534" data-name="Group 2534">
                      <g id="Group_2533" data-name="Group 2533">
                        <g id="Group_2532" data-name="Group 2532">
                          <g id="Group_2531" data-name="Group 2531">
                            <g id="Group_2530" data-name="Group 2530">
                              <g id="Group_2529" data-name="Group 2529">
                                <path
                                  id="Path_3887"
                                  data-name="Path 3887"
                                  d="M26.4,282a3.208,3.208,0,1,0,3.208,3.208A3.212,3.212,0,0,0,26.4,282Zm0,4.417a1.208,1.208,0,1,1,1.208-1.209A1.21,1.21,0,0,1,26.4,286.417Z"
                                  fill="#344952"
                                />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {cart && cart.length}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </a>
      )}
    </div>
  );
}
