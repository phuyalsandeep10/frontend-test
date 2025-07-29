import { Button } from '@/components/ui/button';
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiTwitterFill,
} from '@remixicon/react';
import {
  Book,
  Clock,
  Copy,
  ExternalLink,
  Eye,
  LayoutDashboard,
  Link,
  Mail,
  MessageCircle,
  Monitor,
  Pencil,
  Phone,
  Plus,
  PlusCircle,
  Tag,
  Upload,
  User,
  UserCheck,
  X,
} from 'lucide-react';
import React from 'react';

const InboxChatInfo = () => {
  return (
    <div>
      <div className="font-outfit max-h-screen overflow-y-auto border-l bg-white">
        {/* Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="font-medium text-gray-900">Customer Details</h3>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-10 py-7">
          {/* Profile Section */}
          <div className="border-b p-4 text-center">
            <div className="bg-brand-primary border-light-blue mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2">
              <span className="text-xl font-medium text-white">AJ</span>
            </div>
            <h4 className="text-theme-text-dark mb-2 leading-[34px] font-semibold">
              Alice Johnson
            </h4>
            <p className="text-theme-text-primary mb-2 text-base leading-[26px] font-normal">
              Innovative Solutions
            </p>
            <Button className="flex w-full cursor-pointer items-center justify-center space-x-2 rounded-md bg-purple-600 py-2 text-sm font-medium text-white">
              <div></div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 8C12.5523 8 13 8.44772 13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8ZM12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12ZM12 15C13.1046 15 14 15.8954 14 17H16C16 14.7909 14.2091 13 12 13C9.79086 13 8 14.7909 8 17H10C10 15.8954 10.8954 15 12 15Z"
                  fill="white"
                />
              </svg>

              <span>View Full Profile</span>
            </Button>
          </div>

          {/* Contact Information */}
          <div className="border-theme-text-primary mt-10 rounded-lg border p-2.5">
            <h5 className="text-theme-text-dark flex items-center gap-2 font-medium">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 2H19.0049C20.1068 2 21 2.89821 21 3.9908V20.0092C21 21.1087 20.1074 22 19.0049 22H3V2ZM7 4H5V20H7V4ZM9 20H19V4H9V20ZM11 16C11 14.3431 12.3431 13 14 13C15.6569 13 17 14.3431 17 16H11ZM14 12C12.8954 12 12 11.1046 12 10C12 8.89543 12.8954 8 14 8C15.1046 8 16 8.89543 16 10C16 11.1046 15.1046 12 14 12ZM22 6H24V10H22V6ZM22 12H24V16H22V12Z"
                  fill="#2D004C"
                />
              </svg>
              Contact Information
            </h5>
            <div className="space-y-2">
              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-1">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm text-gray-600">
                    noah.p@example.com
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Copy className="h-4 w-4 text-gray-400" />
                  <Pencil className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm text-gray-600">0000000000</span>
                </div>
                <div className="flex items-center gap-2">
                  <Copy className="h-4 w-4 text-gray-400" />
                  <Pencil className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* General Information */}
          <div className="border-theme-text-primary mt-10 rounded-lg border p-2.5">
            <h5 className="text-theme-text-dark flex items-center gap-2 font-medium">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20ZM10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 8.5V13H12V15H8V13H9V10.5H8V8.5H11ZM11.5 6C11.5 6.82843 10.8284 7.5 10 7.5C9.1716 7.5 8.5 6.82843 8.5 6C8.5 5.17157 9.1716 4.5 10 4.5C10.8284 4.5 11.5 5.17157 11.5 6Z"
                  fill="#2D004C"
                />
              </svg>
              General Information
            </h5>
            <div className="flex flex-col gap-1">
              <div className="mt-3 flex items-center gap-1">
                <span className="text-brand-dark text-sm leading-21 font-semibold">
                  Location:
                </span>
                <span className="text-brand-dark text-sm font-normal">
                  New York, USA
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-brand-dark text-sm leading-21 font-semibold">
                  Last Active:
                </span>
                <span className="text-brand-dark text-sm font-normal">
                  Friday
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-brand-dark text-sm leading-21 font-semibold">
                  Local Time:
                </span>
                <span className="text-brand-dark text-sm font-normal">
                  00:55:08 AM (UTC+2)
                </span>
              </div>
            </div>
          </div>

          {/* Device Information */}
          <div className="border-theme-text-primary mt-10 rounded-lg border p-2.5">
            <h5 className="text-theme-text-dark flex items-center gap-2 font-medium">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 4.00087C2 3.44811 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44463 22 4.00087V17.9991C22 18.5519 21.5447 19 21.0082 19H2.9918C2.44405 19 2 18.5554 2 17.9991V4.00087ZM4 5V17H20V5H4ZM5 20H19V22H5V20Z"
                  fill="#2D004C"
                />
              </svg>
              Device Information
            </h5>
            <div className="mt-3 space-y-2 text-sm">
              <div>
                <span className="text-brand-dark leading-21 font-normal">
                  Chrome 126.0 on Desktop (Windows 11)
                </span>
              </div>
              <div className="flex gap-1">
                <span className="text-brand-dark text-sm leading-21 font-semibold">
                  IP Address:
                </span>
                <span className="text-brand-dark text-sm font-normal">
                  192.168.1.100
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="border-theme-text-primary mt-10 rounded-lg border p-2.5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="text-brand-dark h-4 w-4" />
                <span className="text-theme-text-dark font-medium">Tags</span>
              </div>
              <PlusCircle className="text-theme-text-dark h-5 w-5 cursor-pointer" />
            </div>
            <div className="mt-3 flex gap-2">
              <span className="bg-brand-primary rounded-full px-2 py-1 text-sm font-semibold text-white">
                VIP
              </span>
              <span className="bg-brand-primary rounded-full px-2 py-1 text-sm font-semibold text-white">
                Sales Lead
              </span>
            </div>
          </div>

          {/* Recently Viewed Pages */}
          <div className="border-theme-text-primary mt-10 rounded-lg border p-2.5">
            <div className="text-theme-text-dark flex items-center gap-2 font-medium">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.3643 13.5358L14.9501 12.1216L16.3643 10.7074C18.3169 8.75481 18.3169 5.58897 16.3643 3.63635C14.4117 1.68372 11.2458 1.68372 9.29319 3.63635L7.87898 5.05056L6.46477 3.63635L7.87898 2.22213C10.6127 -0.511543 15.0448 -0.511543 17.7785 2.22213C20.5122 4.9558 20.5122 9.38791 17.7785 12.1216L16.3643 13.5358ZM13.5358 16.3643L12.1216 17.7785C9.38799 20.5121 4.9558 20.5121 2.22213 17.7785C-0.511543 15.0448 -0.511543 10.6126 2.22213 7.87899L3.63634 6.46477L5.05056 7.87899L3.63634 9.29321C1.68372 11.2458 1.68372 14.4116 3.63634 16.3643C5.58896 18.3169 8.75479 18.3169 10.7074 16.3643L12.1216 14.95L13.5358 16.3643ZM12.8287 5.75767L14.243 7.17188L7.17188 14.2429L5.75766 12.8287L12.8287 5.75767Z"
                  fill="#2D004C"
                />
              </svg>

              <span className="text-theme-text-dark font-semibold">
                Recently Viewed pages
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-3">
              <div className="border-theme-text-primary rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Link className="text-theme-text-primary h-4 w-4" />
                  <div>
                    <div className="text-brand-dark text-sm font-medium">
                      Contact page
                    </div>
                    <div className="text-theme-text-primary text-xs">
                      Jul 17, 2025, 10:40 AM
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-theme-text-primary rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Link className="text-theme-text-primary h-4 w-4" />
                  <div>
                    <div className="text-brand-dark text-sm font-medium">
                      Add to the Cart Page
                    </div>
                    <div className="text-theme-text-primary text-xs">
                      Jul 17, 2025, 10:40 AM
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Agent Memo */}
          <div className="border-theme-text-primary mt-10 rounded-lg border p-2.5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Book className="text-brand-dark h-4 w-4" />
                <span className="text-theme-text-dark font-medium">
                  Agent Memo
                </span>
              </div>
              <PlusCircle className="text-theme-text-dark h-5 w-5 cursor-pointer" />
            </div>
            <div className="border-theme-text-primary text-theme-text-primary rounded-lg border p-3 text-sm font-normal">
              <p>
                Investigating file upload issue. Might be a network problem.
              </p>
            </div>
          </div>

          {/* Related Conversations */}
          <div className="border-theme-text-primary mt-10 rounded-lg border p-2.5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3ZM12 17H14C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17Z"
                    fill="#2D004C"
                  />
                </svg>

                <span className="text-theme-text-dark font-medium">
                  Related Conversations/Tickets
                </span>
              </div>
              <PlusCircle className="text-theme-text-dark h-5 w-5 cursor-pointer" />
            </div>
            <div className="border-theme-text-primary text-theme-text-primary rounded-lg border p-3 text-sm font-normal">
              <p>
                Investigating file upload issue. Might be a network problem.
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="border-theme-text-primary mt-10 rounded-lg border p-2.5">
            <h5 className="text-theme-text-dark flex items-center gap-2 font-medium">
              <Clock className="h-4 w-4" />
              Recent Activity
            </h5>
            <div className="mt-3 flex flex-col gap-1">
              <div className="flex items-center space-x-2">
                <MessageCircle className="text-brand-dark h-4 w-4" />
                <div>
                  <p className="text-brand-dark text-sm font-normal">
                    Current conversation started
                  </p>
                  <p className="text-theme-text-primary text-xs">Thu</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Upload className="text-brand-dark h-4 w-4" />
                <div>
                  <p className="text-brand-dark text-sm font-normal">
                    Attempted file upload (failed)
                  </p>
                  <p className="text-theme-text-primary text-xs">Thu</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <UserCheck className="text-brand-dark h-4 w-4" />
                <div>
                  <p className="text-brand-dark text-sm font-normal">
                    Signed up
                  </p>
                  <p className="text-theme-text-primary text-xs">6/20/2024</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="border-theme-text-primary mt-10 rounded-lg border p-2.5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LayoutDashboard className="text-brand-dark h-4 w-4" />
                <span className="text-theme-text-dark font-medium">
                  Social media
                </span>
              </div>
              <PlusCircle className="text-theme-text-dark h-5 w-5 cursor-pointer" />
            </div>
            <div className="mt-3 flex gap-2">
              <div>
                <RiInstagramFill />
              </div>
              <div>
                <RiFacebookCircleFill />
              </div>
              <div>
                <RiTwitterFill />
              </div>
              <div>
                <RiLinkedinBoxFill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxChatInfo;
