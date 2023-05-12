export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _CategoryToSectionGroup: {
        Row: {
          A: number
          B: number
        }
        Insert: {
          A: number
          B: number
        }
        Update: {
          A?: number
          B?: number
        }
      }
      _ProductAttributes: {
        Row: {
          A: number
          B: number
        }
        Insert: {
          A: number
          B: number
        }
        Update: {
          A?: number
          B?: number
        }
      }
      _ProductInFeatured: {
        Row: {
          A: number
          B: number
        }
        Insert: {
          A: number
          B: number
        }
        Update: {
          A?: number
          B?: number
        }
      }
      _ProductInSection: {
        Row: {
          A: number
          B: number
        }
        Insert: {
          A: number
          B: number
        }
        Update: {
          A?: number
          B?: number
        }
      }
      _ProductsInCart: {
        Row: {
          A: number
          B: number
        }
        Insert: {
          A: number
          B: number
        }
        Update: {
          A?: number
          B?: number
        }
      }
      attribute: {
        Row: {
          id: number
          name: string
          value: string
        }
        Insert: {
          id?: number
          name: string
          value: string
        }
        Update: {
          id?: number
          name?: string
          value?: string
        }
      }
      cart: {
        Row: {
          createdAt: string
          id: number
          updatedAt: string
          userId: string
        }
        Insert: {
          createdAt?: string
          id?: number
          updatedAt: string
          userId: string
        }
        Update: {
          createdAt?: string
          id?: number
          updatedAt?: string
          userId?: string
        }
      }
      category: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
      }
      featured: {
        Row: {
          categoryId: number | null
          createdAt: string
          id: number
          imageAlt: string
          imageSrc: string
          name: string
          slug: string
          updatedAt: string
        }
        Insert: {
          categoryId?: number | null
          createdAt?: string
          id?: number
          imageAlt: string
          imageSrc: string
          name: string
          slug: string
          updatedAt: string
        }
        Update: {
          categoryId?: number | null
          createdAt?: string
          id?: number
          imageAlt?: string
          imageSrc?: string
          name?: string
          slug?: string
          updatedAt?: string
        }
      }
      product: {
        Row: {
          createdAt: string
          description: string | null
          discount: number
          gallery: string[] | null
          id: number
          imageAlt: string
          imageSrc: string
          isNowPromotion: boolean
          name: string
          price: number
          rating: number
          rawPrice: number
          slug: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          description?: string | null
          discount?: number
          gallery?: string[] | null
          id?: number
          imageAlt: string
          imageSrc: string
          isNowPromotion?: boolean
          name: string
          price: number
          rating?: number
          rawPrice: number
          slug: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          description?: string | null
          discount?: number
          gallery?: string[] | null
          id?: number
          imageAlt?: string
          imageSrc?: string
          isNowPromotion?: boolean
          name?: string
          price?: number
          rating?: number
          rawPrice?: number
          slug?: string
          updatedAt?: string
        }
      }
      review: {
        Row: {
          content: string
          createdAt: string
          gallery: string[] | null
          id: number
          productId: number
          rating: number
          title: string
          updatedAt: string
          userId: string
        }
        Insert: {
          content: string
          createdAt?: string
          gallery?: string[] | null
          id?: number
          productId: number
          rating: number
          title: string
          updatedAt: string
          userId: string
        }
        Update: {
          content?: string
          createdAt?: string
          gallery?: string[] | null
          id?: number
          productId?: number
          rating?: number
          title?: string
          updatedAt?: string
          userId?: string
        }
      }
      section: {
        Row: {
          createdAt: string
          id: number
          imageAlt: string | null
          imageSrc: string | null
          name: string
          sectionGroupId: number | null
          slug: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          imageAlt?: string | null
          imageSrc?: string | null
          name: string
          sectionGroupId?: number | null
          slug: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: number
          imageAlt?: string | null
          imageSrc?: string | null
          name?: string
          sectionGroupId?: number | null
          slug?: string
          updatedAt?: string
        }
      }
      section_group: {
        Row: {
          createdAt: string
          id: number
          name: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: number
          name: string
          updatedAt: string
        }
        Update: {
          createdAt?: string
          id?: number
          name?: string
          updatedAt?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
