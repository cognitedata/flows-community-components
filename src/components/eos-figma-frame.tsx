'use client';

import Image from 'next/image';
import * as React from 'react';

// Image assets served by the Cursor Figma socket server
const imgTypeImageSizeDefault =
  'http://localhost:3845/assets/a07b0b43d6f080949cc7f3e45da3ec90c1c42f92.png';
// const img =
//   "http://localhost:3845/assets/a482367d3127ae749627dc4cbb0adaf47834bdd7.svg";
const imgTopology2 =
  'http://localhost:3845/assets/26347d22dcd6781316ce094700faadc58102588a.svg';
const imgTopology3 =
  'http://localhost:3845/assets/f90f0f15273c08a98520b501bb19b7518d2744b0.svg';
const imgTopology4 =
  'http://localhost:3845/assets/199898fcba893ba407aa8cfabb956f68cde006ff.svg';
const img1 =
  'http://localhost:3845/assets/c4bfcc05b2211762ea829ca4a806bcb4a3dfa19e.svg';
const img2 =
  'http://localhost:3845/assets/3fec8c298019092682cedf903bfdb0203f8813b5.svg';
const img3 =
  'http://localhost:3845/assets/f48ce899873eebc39fc0921ca45250dc471e1d01.svg';
const img4 =
  'http://localhost:3845/assets/235bf13cdfca825048356b4cae927cfd183f046b.svg';
const img5 =
  'http://localhost:3845/assets/de7cf65f60aab3ac0b655e708139c0c19046565f.svg';
const img6 =
  'http://localhost:3845/assets/b96cbc2a708534eb48dac13417d5bcc678f3f675.svg';
const img7 =
  'http://localhost:3845/assets/abaa8a46b70b0bdc88f95b355ac5ceb86660a04c.svg';
const img8 =
  'http://localhost:3845/assets/4276c7a6280b37db680ace60276af1b66d26d8d6.svg';
const img9 =
  'http://localhost:3845/assets/58066f2c55b15ca729c58bc0afdf1d6f5c6c5545.svg';
const img10 =
  'http://localhost:3845/assets/b77e301d4b6c5f4efafb40e832a13241149c3fe4.svg';
const img11 =
  'http://localhost:3845/assets/03702018f2ae85551243231639427bb5c0e1a196.svg';
const img12 =
  'http://localhost:3845/assets/d1fac7b12a61fa668df5dd4b9f5fdc6638b3b585.svg';
const img13 =
  'http://localhost:3845/assets/067b42a5ff10e1b090eb685c55f729502d4d54a1.svg';
const img14 =
  'http://localhost:3845/assets/b8bb4e3256225889c3de1ddcafd44dc991c4d5c2.svg';
const img15 =
  'http://localhost:3845/assets/9061c0695495d0b2a2e291b21fae9536790582ad.svg';
// const img16 = "http://localhost:3845/assets/611e78d64d2fff8ccf810c1eddd971ffefca2ce8.svg"
// const imgGroup = "http://localhost:3845/assets/f9d31d2f53f5d97c70c4b0614d2391b0dc820b61.svg"
const imgGroup1 =
  'http://localhost:3845/assets/f65132dd01c167ee216d358a38bea72b98012743.svg';
// const imgGroup2 = "http://localhost:3845/assets/9678c041f7dc6546a0108b3c115d9fe78e5328f5.svg"
// const imgGroup3 = "http://localhost:3845/assets/6c967e71715ee3ec52718ed84525e8629c9cfb96.svg"
// const img17 = "http://localhost:3845/assets/8f3c3bbe8ca1b996d19fbcb23029d1699c045009.svg"
// const imgEllipse7 = "http://localhost:3845/assets/13c8cbbc6cd294c9b78b4bad4ff8e64cb66f7f7a.svg"
// const img18 = "http://localhost:3845/assets/70f2fe353ac8fe42ce2445eecf0d124b5506a6b6.svg"
// const imgEllipse6 = "http://localhost:3845/assets/33eb4322a09eef759208f57721f0a0c7fbd869a7.svg"
// const img19 = "http://localhost:3845/assets/996c5017a2bcf910551deaf6e16ec451597cd343.svg"
// const imgGroup4 = "http://localhost:3845/assets/9036360cfcdc6135e56698a6bca2697d0b4e60bd.svg"
// const img20 = "http://localhost:3845/assets/633455eb225ec1f6f76cbfc5ef2938604ab45540.svg"

interface AvatarProps {
  avatarText?: string;
  type?:
    | 'Indigo'
    | 'Violet'
    | 'Fuchsia'
    | 'Purple'
    | 'Pink'
    | 'Rose'
    | 'Orange'
    | 'Amber'
    | 'Yellow'
    | 'Green'
    | 'Emerald'
    | 'Teal'
    | 'Cyan'
    | 'Sky'
    | 'Image'
    | 'Lime'
    | 'Slate'
    | 'Glacier';
  size?: 'Default' | 'Small' | 'Large';
}

function Avatar({
  avatarText = 'PJ',
  type = 'Indigo',
  size = 'Small',
}: AvatarProps) {
  if (type === 'Image' && size === 'Default') {
    return (
      <div
        className="relative rounded-[4px] size-full"
        data-name="Type=Image, Size=Default"
      >
        <Image
          alt=""
          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[4px] size-full"
          src={imgTypeImageSizeDefault}
        />
      </div>
    );
  }
  // Minimal fallback
  return (
    <div className="flex items-center justify-center rounded-[4px] bg-muted text-foreground size-full">
      <span className="text-xs font-medium">{avatarText}</span>
    </div>
  );
}

// interface BadgeProps {
//   icon?: React.ReactNode | null;
//   leadingIcon?: boolean;
//   label?: boolean;
//   description?: string;
//   type?:
//     | "Error"
//     | "Warning"
//     | "Success"
//     | "Neutral"
//     | "Indigo"
//     | "Violet"
//     | "Fuchsia"
//     | "Purple"
//     | "Pink"
//     | "Orange"
//     | "Yellow"
//     | "Emerald"
//     | "Teal"
//     | "Cyan"
//     | "Sky"
//     | "Lime"
//     | "Glacier";
// }

// function BadgeImpl({
//   icon = null,
//   leadingIcon = true,
//   label = true,
//   description = "Badge",
//   type = "Error",
// }: BadgeProps) {
//   if (type === "Lime") {
//     return (
//       <div
//         className="box-border content-stretch flex gap-[4px] items-center justify-center px-[4px] py-0 relative rounded-[2px]"
//         data-name="Type=Lime"
//       >
//         {leadingIcon &&
//           (icon || (
//             <div className="overflow-clip relative shrink-0 size-[12px]">
//               <div className="absolute inset-[6.25%]">
//                 <img alt="" className="block max-w-none size-full" src={img} />
//               </div>
//             </div>
//           ))}
//         {label && (
//           <div className="flex flex-col justify-center leading-[0] not-italic relative shrink-0 text-[#446321] text-[12px] text-center text-nowrap">
//             <p className="leading-[16px] whitespace-pre">{description}</p>
//           </div>
//         )}
//       </div>
//     );
//   }
//   return null;
// }

export function EosFigmaFrame() {
  return (
    <div
      className="bg-gradient-to-r from-[#0c0f17] relative min-h-[calc(100vh-4rem)] to-[#0c0f17]"
      data-name="Start"
      style={{
        backgroundImage:
          "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 1440 1024\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'0.30000001192092896\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(5.2198e-15 60.619 -85.245 3.7118e-15 720 417.81)\\'><stop stop-color=\\'rgba(205,236,251,0.3)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(159,184,199,0.4)\\' offset=\\'0.14335\\'/><stop stop-color=\\'rgba(114,131,146,0.5)\\' offset=\\'0.2867\\'/><stop stop-color=\\'rgba(68,79,94,0.6)\\' offset=\\'0.43006\\'/><stop stop-color=\\'rgba(45,52,67,0.65)\\' offset=\\'0.50173\\'/><stop stop-color=\\'rgba(22,26,41,0.7)\\' offset=\\'0.57341\\'/></radialGradient></defs></svg>')",
      }}
    >
      {/* Topology background images */}
      <div className="pointer-events-none absolute left-[-448.18px] top-[159.72px] h-[1296.263px] w-[1302.131px] flex items-center justify-center">
        <div className="flex-none rotate-[240deg]">
          <div className="relative h-[959.102px] w-[943.068px]">
            <div className="absolute inset-[-0.16%]">
              <Image
                alt=""
                className="block max-w-none size-full"
                src={imgTopology2}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute left-[648.32px] top-[490.45px] h-[959.102px] w-[943.068px]">
        <div className="absolute inset-[-0.16%]">
          <Image
            alt=""
            className="block max-w-none size-full"
            src={imgTopology3}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute left-[176.39px] top-[-553.69px] h-[1302.131px] w-[1296.263px] flex items-center justify-center">
        <div className="flex-none rotate-[330deg]">
          <div className="relative h-[959.102px] w-[943.068px]">
            <div className="absolute inset-[-0.16%]">
              <Image
                alt=""
                className="block max-w-none size-full"
                src={imgTopology4}
              />
            </div>
          </div>
        </div>
      </div>

      {/* In-app header */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-3 py-4 max-h-[48px] w-[1440px]">
        <div className="relative shrink-0 size-[32px]">
          <div className="absolute bottom-[21.44%] left-0 right-[0.01%] top-[20.31%]">
            <Image alt="" className="block max-w-none size-full" src={img1} />
          </div>
        </div>
        <div className="flex h-[32px] items-center gap-2 overflow-clip">
          <div className="flex h-[32px] items-center gap-2 rounded-[2px] bg-[#cdecfb] px-2">
            <div className="relative size-4">
              <div className="absolute inset-[6.25%]">
                <Image
                  alt=""
                  className="block max-w-none size-full"
                  src={img2}
                />
              </div>
            </div>
            <div className="text-[14px] font-medium text-[#161a29]">
              Overview
            </div>
          </div>
          <div className="flex h-[32px] items-center gap-2 rounded-[2px] px-2">
            <div className="relative size-4">
              <div className="absolute inset-[7.969%]">
                <Image
                  alt=""
                  className="block max-w-none size-full"
                  src={img3}
                />
              </div>
            </div>
            <div className="text-[14px] font-medium text-slate-400">Views</div>
          </div>
          <div className="flex h-[32px] items-center gap-2 rounded-[2px] px-2">
            <div className="relative size-4">
              <div className="absolute inset-[6.25%]">
                <Image
                  alt=""
                  className="block max-w-none size-full"
                  src={img4}
                />
              </div>
            </div>
            <div className="text-[14px] font-medium text-slate-400">
              App library
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="grid place-items-center rounded-[4px] size-[32px]">
            <div className="relative size-4">
              <div className="absolute inset-[6.25%]">
                <Image
                  alt=""
                  className="block max-w-none size-full"
                  src={img5}
                />
              </div>
            </div>
          </div>
          <div className="grid place-items-center rounded-[4px] size-[32px]">
            <div className="relative size-4">
              <div className="absolute inset-[7.97%_12.13%_7.97%_12.14%]">
                <Image
                  alt=""
                  className="block max-w-none size-full"
                  src={img6}
                />
              </div>
            </div>
          </div>
          <div className="grid place-items-center rounded-[4px] size-[32px]">
            <div className="relative size-4">
              <div className="absolute inset-[3.802%]">
                <Image
                  alt=""
                  className="block max-w-none size-full"
                  src={img7}
                />
              </div>
            </div>
          </div>
          <div className="relative rounded-[4px] size-[32px]">
            <Avatar type="Image" size="Default" />
          </div>
        </div>
      </div>

      {/* Center content (hero + input + cards) */}
      <div className="absolute left-[305px] top-[258px] flex w-[854px] flex-col items-center gap-[80px]">
        <div className="flex w-[680px] flex-col items-center gap-2">
          <div className="backdrop-blur-[20px] shadow-lg flex w-full items-center justify-center gap-2 overflow-clip rounded-[4px] p-6">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="text-[24px] leading-[28px] text-[#fefeff]">
                <p>
                  <span>{'Hello, '}</span>
                  <span className="text-[#a9f853]">Mike H.</span>
                </p>
              </div>
              <div className="text-[18px] leading-[24px] text-slate-400">
                <p>What can Atlas help you with today?</p>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="backdrop-blur-sm bg-[rgba(12,15,23,0.5)] rounded-[4px] border border-slate-800 p-4">
              <div className="text-[14px] leading-[20px] text-slate-400">
                I want to analyze vibrations and frequency data on @21PT1019
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid place-items-center rounded-[4px] size-[32px]">
                    <div className="relative size-4">
                      <div className="absolute inset-[9.38%_12.5%]">
                        <Image
                          alt=""
                          className="block max-w-none size-full"
                          src={img8}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid place-items-center rounded-[4px] size-[32px]">
                    <div className="relative size-4">
                      <div className="absolute inset-[6.25%]">
                        <Image
                          alt=""
                          className="block max-w-none size-full"
                          src={img9}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid place-items-center rounded-[4px] size-[32px]">
                    <div className="relative size-4">
                      <div className="absolute inset-[6.25%]">
                        <Image
                          alt=""
                          className="block max-w-none size-full"
                          src={img10}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="grid place-items-center rounded-[4px] size-[32px]">
                    <div className="relative size-4">
                      <div className="absolute inset-[6.25%_18.75%]">
                        <Image
                          alt=""
                          className="block max-w-none size-full"
                          src={img11}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid place-items-center rounded-[4px] size-[32px] bg-slate-400">
                    <div className="relative size-4">
                      <div className="absolute inset-[6.25%]">
                        <Image
                          alt=""
                          className="block max-w-none size-full"
                          src={img12}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-center gap-2">
              <div className="flex h-[32px] items-center gap-2 rounded-[4px] bg-[#0c0f17] px-3">
                <div className="text-[14px] text-[#fefeff]">
                  Incident investigation
                </div>
                <div className="relative size-4">
                  <div className="absolute inset-[38.75%_20%_26.25%_20%]">
                    <Image
                      alt=""
                      className="block max-w-none size-full"
                      src={img13}
                    />
                  </div>
                </div>
              </div>
              <div className="flex h-[32px] items-center gap-2 rounded-[4px] bg-[#0c0f17] px-3">
                <div className="text-[14px] text-[#fefeff]">
                  Analyze and act
                </div>
                <div className="relative size-4">
                  <div className="absolute inset-[38.75%_20%_26.25%_20%]">
                    <Image
                      alt=""
                      className="block max-w-none size-full"
                      src={img13}
                    />
                  </div>
                </div>
              </div>
              <div className="flex h-[32px] items-center gap-2 rounded-[4px] bg-[#0c0f17] px-3">
                <div className="text-[14px] text-[#fefeff]">
                  Optimize maintenance
                </div>
                <div className="relative size-4">
                  <div className="absolute inset-[38.75%_20%_26.25%_20%]">
                    <Image
                      alt=""
                      className="block max-w-none size-full"
                      src={img13}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar and cards (first card only shows key visuals to stay concise) */}
        <div className="w-full">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex h-[32px] items-center gap-2 rounded-[4px] px-3">
              <div className="text-[14px] text-[#fefeff]">
                Executive overview
              </div>
              <div className="relative size-4">
                <div className="absolute inset-[38.75%_20%_26.25%_20%]">
                  <Image
                    alt=""
                    className="block max-w-none size-full"
                    src={img13}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-[32px] items-center gap-2 rounded-[4px] px-3">
                <div className="relative size-4">
                  <div className="absolute inset-[21.875%]">
                    <Image
                      alt=""
                      className="block max-w-none size-full"
                      src={img14}
                    />
                  </div>
                </div>
                <div className="text-[14px] text-[#fefeff]">Add</div>
              </div>
              <div className="flex h-[32px] items-center gap-2 rounded-[4px] px-3">
                <div className="relative size-4">
                  <div className="absolute inset-[6.25%]">
                    <Image
                      alt=""
                      className="block max-w-none size-full"
                      src={img15}
                    />
                  </div>
                </div>
                <div className="text-[14px] text-[#fefeff]">Edit</div>
              </div>
            </div>
          </div>

          {/* First KPI card as pixel-faithful rendering; others are present in our earlier implementation */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative rounded-[6px] border border-slate-800/80 bg-[rgba(12,15,23,0.2)] p-3 backdrop-blur-[3px]">
              <div className="flex items-center gap-2">
                <div className="rounded-[2px] bg-indigo-950 p-1" />
                <div className="text-sm font-medium text-[#fefeff]">
                  Energy efficiency vs target
                </div>
                <div className="ml-auto text-xs text-slate-400">
                  Last 6 months
                </div>
              </div>
              <div className="mt-2">
                <div className="relative h-[120px] w-full">
                  <div className="absolute inset-0">
                    <Image
                      alt="chart"
                      src={imgGroup1}
                      className="block max-w-none"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="rounded-[2px] bg-[#1b2536] px-1 text-[12px] text-[#cdecfb]">
                  Target: 90%
                </div>
                <div className="rounded-[2px] bg-[#223211] px-1 text-[12px] text-[#cbfb98]">
                  Actual: 95%
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[6px] border border-slate-800" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EosFigmaFrame;
